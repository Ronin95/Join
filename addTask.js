let allTasks = [];

function addTask() {
  loadTask();
<<<<<<< HEAD
  let title = document.getElementById("title");
  let date = document.getElementById("dateTask");
  let category = document.getElementById("category");
  let urgency = document.getElementById("urgency");
  let description = document.getElementById("description");
  let user = document.getElementById("user");
  let id = allTasks.length;
=======
  let title = document.getElementById('title');
  let date = document.getElementById('dateTask');
  let category = document.getElementById('category');
  let urgency = document.getElementById('urgency');
  let description = document.getElementById('description');
  let user = document.getElementById('user');
>>>>>>> 45cd8a4c49bb3981d0d5e2763d877ac8964d84f1
  let newTask = {
    title: title.value,
    date: date.value,
    category: category.value,
    urgency: urgency.value,
    description: description.value,
<<<<<<< HEAD
    user: user.value,
    id: id++,
=======
    selectedUser: user.value,
>>>>>>> 45cd8a4c49bb3981d0d5e2763d877ac8964d84f1
  };
  saveTask(newTask);
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
  clearInput();
  doneIt();
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
