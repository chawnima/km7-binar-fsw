const express = require("express");
const students = require("./data.json");
const fs = require("fs");

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
  const { name, nickName, address, education } = req.body;
  const { province, city } = address;
  const { bachelor } = education;
  if (
    !name ||
    !nickName ||
    !req.body.class ||
    !province ||
    !city ||
    !bachelor
  ) {
    res.status(400).json({
      message: "error: missing some data info",
    });
    return;
  }

  const newStudent = {
    id: students.length + 1,
    name,
    nickName,
    class: req.body.class,
    address: {
      province,
      city,
    },
    education: {
      bachelor,
    },
  };
  students.push(newStudent);
  const data = fs.readFileSync("./data.json");
  const myObject = JSON.parse(data);
  myObject.push(newStudent);
  const newData = JSON.stringify(myObject, null, 2);
  fs.writeFileSync("./data.json", newData);
  res.status(201).json(students);
});

app.listen(port, () => {
  console.log(`The express.js app is running on port ${port}`);
});
