const express = require("express");
const students = require("./data.json");
const fs = require("fs");
const { z } = require("zod");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("lolol");
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const { id } = req.params;

  const student = students.find((student) => student.id == id);
  if (student) {
    res.json(student);
    return;
  }
  res.status(404).json({ message: "Not found" });
});

app.post("/students", (req, res) => {
  const validateBody = z.object({
    name: z.string(),
    nickName: z.string(),
    class: z.string(),
    address: z.object({
      province: z.string(),
      city: z.string(),
    }),
    education: z
      .object({
        bachelor: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  });

  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors.map((err) => ({
        field: err.path[0],
        issue: err.message,
      })),
    });
  }
  const maxId=students.reduce((max,student)=>Math.max(max,student.id),0)
  const newStudent = {
    id: maxId+1,
    ...req.body,
  };
  students.push(newStudent);
  fs.writeFileSync("./data.json", JSON.stringify(students, null, 2), "utf-8");
  res.status(201).json(students);
});

app.delete("/students/:id", (req, res) => {
  const validateParams = z.object({
    id: z.string(),
  });
  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors.map((err) => ({
        field: err.path[0],
        issue: err.message,
      })),
    });
  };
  const {id}=req.params;
  const index=students.findIndex(student=>student.id==id);
  if (index==-1){
    res.status(400).json({message:"Students id not found"});
  }
  students.splice(index,1);
  fs.writeFileSync("./data.json", JSON.stringify(students, null, 2), "utf-8");
  res.status(201).json(students);
});

app.listen(port, () => {
  console.log(`The express.js app is running on port ${port}`);
});
