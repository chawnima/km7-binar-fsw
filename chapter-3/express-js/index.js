const express = require("express");
const students = require("./data.json");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("lolol");
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id",(req,res)=>{
  const {id}=req.params;

  const student=students.find((student)=>student.id==id);
  if(student){
    res.json(student);
    return;
  }
  res.status(404).json({message:"Not found"});
})
app.listen(port, () => {
  console.log(`The express.js app is running on port ${port}`);
});
