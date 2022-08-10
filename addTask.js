let allTasks = [];
let selectedUser = [];

function addTask() {
  loadTask();
  let title = document.getElementById('title');
  let date = document.getElementById('dateTask');
  let category = document.getElementById('category');
  let urgency = document.getElementById('urgency');
  let description = document.getElementById('description');
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

function loadAllTasks() {
  loadTask();
  for (let i = 0; i < allTasks.length; i++) {
    let newTask = allTasks[i];
    let newTasks = document.getElementById('freshTask');
    newTasks.innerHTML += newTaskTemp(newTask, i);
  }
}

async function initX() {
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  await includeHTML();
  backend.setItem('Test', 'Hallo');
}

function saveTask(newTask) {
  allTasks.push(newTask);
  let task = JSON.stringify(allTasks);
  localStorage.setItem('Task', task);
}

function loadTask() {
  let task = localStorage.getItem('Task');
  if (task) {
    allTasks = JSON.parse(task);
  }
}

function clearInput() {
  title.value = '';
  category.selectedIndex = 0;
  urgency.selectedIndex = 0;
  description.value = '';
}

function doneIt() {
  document.getElementById('succes-arrow').classList.remove('d-none');
  setTimeout(function () {
    document.getElementById('succes-arrow').classList.add('d-none');
  }, 2000);
}

function showAllUser() {
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let showUser = document.getElementById('user');
    showUser.innerHTML += `<img id="selected${i}" onclick="selectUser(${i})" class="user-show" src="${user.avatar}" alt="">`
  };
}

function selectUser(i) {
  document.getElementById(`selected${i}`).classList.toggle('user-selected');
selectedUser.push(user[i]);
let userChoice = JSON.stringify(selectedUser);
localStorage.setItem('User', userChoice);
}


// allTasks.push(newTask);
// let task = JSON.stringify(allTasks);
// localStorage.setItem('Task', task);
// }
