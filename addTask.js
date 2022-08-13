let allTasks = [];
let selectedUser = [];
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();

function addTask() {
  loadAllTasks();
  let title = document.getElementById("title");
  let date = document.getElementById("dateTask");
  let category = document.getElementById("category");
  let urgency = document.getElementById("urgency");
  let description = document.getElementById("description");
  let id = allTasks.length;
  let newTask = {
    title: title.value,
    date: date.value,
    category: category.value,
    urgency: urgency.value,
    description: description.value,
    userForTask: selectedUser,
    id: id++,
    state: "toDo",
  };
  if (newTask.date = !date.value) {
    newTask.date = today
  } else {newTask.date = date.value}
  saveTask(newTask);
  clearInput();
  doneIt();
}

async function initX() {
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem("allTasks")) || [];
  await includeHTML();
  backend.setItem("Test", "Hallo");
}

function saveTask(newTask) {
  allTasks.push(newTask);
  saveAllTasks();
}

function clearInput() {
  title.value = "";
  category.selectedIndex = 0;
  urgency.selectedIndex = 0;
  description.value = "";
}

function doneIt() {
  document.getElementById("succes_task").classList.remove("d-none");
  document.getElementById("task_for_user").innerHTML = `For ${selectedUser.name}`;
  setTimeout(function () {
    document.getElementById("succes_task").classList.add("d-none");
  }, 2000);
}

function showAllUser() {
  document.getElementById("user").innerHTML = ``;
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let showUser = document.getElementById("user");
    showUser.innerHTML += `<img id="selected${i}" onclick="selectUser(${i})" class="user-show" src="${user.avatar}" alt="">`;
  }
}

function selectUser(i) {
  document.getElementById(`selected${i}`).classList.toggle("user-selected");
  selectedUser = users[i];
  document.getElementById(`user`).innerHTML = /*html*/ ` 
    <div onclick="showAllUserAndDisable()"> 
      <img id="${i}" class="user-show user-selected" src="${selectedUser.avatar}" alt=""></div>`;
  document.getElementById("createTask").removeAttribute("disabled");
}

function showAllUserAndDisable() {
  showAllUser();
  document.getElementById("createTask").disabled = true;
}

function loadCurrentDate() {
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("wichDate").innerHTML += `
<input id="dateTask" placeholder="${today}" class="textbox-n" type="text" onfocus="(this.type='date')" >`;
}
