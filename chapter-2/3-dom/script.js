import data from "./data.json" with {type:"json"};
const btn=document.getElementById("btn");
const studentContainer=document.getElementById("student-container");
const search=document.getElementById("search")
/*data.map((student)=>{
  studentContainer.innerHTML+=`
    <div class="card col-md-auto" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${student.name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${student.education.bachelor}</h6>
        <p class="card-text">My name is ${student.name}, used to called ${student.nickName}, I am from ${student.address.city}, ${student.address.province}. And i am student of ${student.education.bachelor}</p>
      </div>
    </div>
    `
});
*/
search.addEventListener("input",()=>{
  studentContainer.innerHTML=''
  data.map((student)=>{
    if(student.name.toLocaleLowerCase().includes(search.value)){
      studentContainer.innerHTML+=`
        <div class="card col-md-auto" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${student.name}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${student.education.bachelor}</h6>
            <p class="card-text">My name is ${student.name}, used to called ${student.nickName}, I am from ${student.address.city}, ${student.address.province}. And i am student of ${student.education.bachelor}</p>
          </div>
        </div>
        `
    }
  })
})