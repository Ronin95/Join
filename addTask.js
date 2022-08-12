let allTasks = [];
let selectedUser = [];

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
  document.getElementById("succes-arrow").classList.remove("d-none");
  setTimeout(function () {
    document.getElementById("succes-arrow").classList.add("d-none");
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
