let allTasks = [];

function addTask() {
  let title = document.getElementById('title');
  let date = document.getElementById('dateTask');
  let category = document.getElementById('category');
  let urgency = document.getElementById('urgency');
  let description = document.getElementById('description');
  let user = document.getElementById('user');
  // The above 6 lines of code only refer to the id field in the html
  let newTask = [{
    'title': title.value,
    'date': date.value,
    'category': category.value,
    'urgency': urgency.value,
    'description': description.value,
    'user': user.value,
  }];
  // The above array creates the base structure as to how of an
  // array we want to save from addTask.html that can then be displayed
  // in backlog.html
  saveTask(newTask); // save the array
  clearInput(); // clear the fields that were previously inputed by the user
}

function saveTask(newTask) {
  allTasks.push(newTask);
  let task = JSON.stringify(allTasks); 
  localStorage.setItem('allTasks', task);
}

function loadAllTasks() {
  if (allTasks.length === 0) {
    let noTask = document.getElementById('freshTask');
    noTask.innerHTML += /*html*/`
      <h1>Please add a new Task into Add Task</h1>
    `;
  }

}

function clearInput() {
  title.value = '';
  category.selectedIndex = 0;
  urgency.selectedIndex = 0;
  description.value = '';
}

async function initX() {
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  await includeHTML();
  backend.setItem('Test', 'Hallo');
}
