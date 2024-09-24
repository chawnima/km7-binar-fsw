//import data from "./data.json" with {type:"json"}; // import data

//deklarasi
const btn = document.getElementById("btn");
const studentContainer = document.getElementById("student-container");
const search = document.getElementById("search");
const searchForm = document.getElementById("search-form");

//render data ke dom
const renderStudent = (studentData) => {
  studentData.map((student) => {
    studentContainer.innerHTML += `
        <div class="card col-md-auto" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${student.name}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${student.education.bachelor}</h6>
            <p class="card-text">My name is ${student.name}, used to called ${student.nickName}, I am from ${student.address.city}, ${student.address.province}. And i am student of ${student.education.bachelor}</p>
          </div>
        </div>
        `;
  });
};

//render setiap data
const getStudentData = async (search) => {
  const fet = await fetch("./data.json");
  const data = await fet.json();
  let filteredStudent = [];
  studentContainer.innerHTML = "";
  if (!search) {
    renderStudent(data);
    return;
  }
  data.map((student) => {
    if (student.name.toLocaleLowerCase().includes(search)) {
      filteredStudent.push(student);
    }
  });
  if (filteredStudent.length == 0) {
    studentContainer.innerHTML = `Search: ${search} not found`;
    return;
  }
  renderStudent(filteredStudent);
};

getStudentData();

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

//search student
search.addEventListener("input", (e) => {
  getStudentData(e.target.value);
});
