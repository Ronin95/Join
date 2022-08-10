let allTasks = [];
let selectedUser = [];

function addTask() {
  loadTask();
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
    // user: user.value,
    id: id++,
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
  let task = JSON.stringify(allTasks);
  localStorage.setItem("Task", task);
}

function loadTask() {
  let task = localStorage.getItem("Task");
  let user = localStorage.getItem("User");
  if (task && user) {
    allTasks = JSON.parse(task);
    selectedUser = JSON.parse(user);
  }
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
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let showUser = document.getElementById("user");
    showUser.innerHTML += `<img id="selected${i}" onclick="selectUser(${i})" class="user-show" src="${user.avatar}" alt="">`;
  }
}

function loadAllTasks() {
  loadTask();
  for (let i = 0; i < allTasks.length; i++) {
    let newTask = allTasks[i];
    let newTasks = document.getElementById("freshTask");
    newTasks.innerHTML += newTaskTemp(newTask, i);
  }
}

function loadUserinBacklog() {
  for (let i = 0; i < selectedUser.length; i++) {
    let user = selectedUser[i];
    let userChoice = document.getElementById('wich_user');
    let userPic = document.getElementById('user_pic');
    userChoice.innerHTML += /*html*/ ` <p>${user.name}</p>
    <p>${user.name.toLowerCase()}@join.com</p>`;
    userPic.innerHTML += ` <img class="backlog-img" src="${user.avatar}" alt="">`
  }
}

function selectUser(i) {
  document.getElementById(`selected${i}`).classList.toggle("user-selected");
  if (selectedUser.includes(users[i])) {
    selectedUser = selectedUser.filter((a) => a != users[i]);
  } else {
    selectedUser.push(users[i]);
  }
  let userChoice = JSON.stringify(selectedUser);
  localStorage.setItem("User", userChoice);
}
