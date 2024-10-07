const express = require("express");
const students = require("./data.json");
const fs = require("fs");
const { z } = require("zod");
require("express-async-errors");
const router=require("./src/routes");
const { notFoundURLHandler } = require("./src/middlewares/errors");

const app = express();
const port = 3000;
app.use(express.json());
/*
const successResponse = (res, data) => {
  res.status(200).json({ success: true, data });
};

app.get("/", (req, res) => {
  res.send("lolol");
});*/

/*
app.get("/students", (req, res, next) => {
  const validateQuery = z.object({
    name: z.string().optional(),
    nickName: z.string().optional(),
  });
  const resultValidateQuery = validateQuery.safeParse(req.params);
  if (!resultValidateQuery.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: resultValidateQuery.error.errors.map((err) => ({
        field: err.path[0],
        issue: err.message,
      })),
    });
  }

  const nameQuery = req.query.name?.toLocaleLowerCase();
  const nickNameQuery = req.query.nickName?.toLocaleLowerCase();

  const searchedStudent = students.filter((student) => {
    const nameMatch = nameQuery
      ? student.name.toLocaleLowerCase().includes(nameQuery)
      : true;
    const nickNameMatch = nickNameQuery
      ? student.nickName.toLocaleLowerCase().includes(nickNameQuery)
      : true;

    return nameMatch && nickNameMatch;
  });

  if (!searchedStudent.length) {
    res.status(400).json({ message: "no student found" });
  }
  successResponse(res, searchedStudent);
});
*/

app.use("/",router);

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
  const maxId = students.reduce((max, student) => Math.max(max, student.id), 0);
  const newStudent = {
    id: maxId + 1,
    ...req.body,
  };
  students.push(newStudent);
  fs.writeFileSync("./data.json", JSON.stringify(students, null, 2), "utf-8");
  successResponse(res, students);
});

app.put("/students/:id", (req, res) => {
  const validateParams = z.object({
    id: z.string(),
  });
  const paramsResult = validateParams.safeParse(req.params);
  if (!paramsResult.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors.map((err) => ({
        field: err.path[0],
        issue: err.message,
      })),
    });
  }
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
  const id = Number(req.params.id);
  const index = students.findIndex((student) => student.id === id);
  if (index == -1) {
    res.status(400).json({ message: "Students id not found" });
  }
  students[index] = {
    id: id,
    ...req.body,
  };
  fs.writeFileSync("./data.json", JSON.stringify(students, null, 2), "utf-8");
  successResponse(res, students);
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
  }
  const id = Number(req.params.id);
  const index = students.findIndex((student) => student.id === id);
  if (index == -1) {
    res.status(400).json({ message: "Students id not found" });
  }
  students.splice(index, 1);
  fs.writeFileSync("./data.json", JSON.stringify(students, null, 2), "utf-8");
  successResponse(res, students);
});

app.use("*",notFoundURLHandler);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errors = err.errors || [];
  const message = status != 500 ? err.message : "Internal Server Error";
  console.log(err);
  res.status(status).json({
    success: false,
    data: null,
    message,
    errors,
  });
});


app.listen(port, () => {
  console.log(`The express.js app is running on port ${port}`);
});
