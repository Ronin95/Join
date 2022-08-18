let selectedUser = [];
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();

/**
 * add a new task, by getting the values from document by id
 * safe in the JSON new Task
 * clear the input
 * show a message the Message with the value for wich Member is the task added
 */
function addTask() {
  allTasks = loadFromBackend('allTasks');
  let title = document.getElementById('title');
  let date = document.getElementById('dateTask');
  let category = document.getElementById('category');
  let urgency = document.getElementById('urgency');
  let description = document.getElementById('description');
  let id = 0;
  let newTask = {
    title: title.value,
    date: date.value,
    category: category.value,
    urgency: urgency.value,
    description: description.value,
    userForTask: selectedUser,
    id: new Date().getTime(),
    state: 'toDo',
  };
  if ((newTask.date = !date.value)) {
    newTask.date = today;
  } else {
    newTask.date = date.value;
  }
  saveTask(newTask);
  clearInput();
  doneIt();
}

/**
 * save the new Task and push it to the JSON all Task
 * @param {string} newTask - This ist the JSON array that will be created
 * push the newTask into allTasks JSON array
 */
function saveTask(newTask) {
  allTasks.push(newTask);
  saveInBackend(allTasks, 'allTasks');
}

/**
 * clear the input values and set the category and urgency on a default value
 */
function clearInput() {
  title.value = '';
  category.selectedIndex = 0;
  urgency.selectedIndex = 0;
  description.value = '';
}

/**
 * delete unsafed values from the inputs if the written or clicked are not really want to add
 */
function deleteUnsafedInput() {
  document.getElementById('title').value = '';
  document.getElementById('category').selectedIndex = 0;
  document.getElementById('urgency').selectedIndex = 0;
  document.getElementById('description').value = '';
  showAllUser();
}

/**
 * creates a small Pop-up that tells the adder that the task is added
 * The pop-up also shows who the task was created for
 * the pop is blended out after 2 seconds
 */
function doneIt() {
  alert('Your task is created');
  // document.getElementById('succes_task').classList.remove('d-none');
  // document.getElementById('task_for_user').innerHTML = `For ${selectedUser.name}`;
  // setTimeout(function () {
  //   document.getElementById('succes_task').classList.add('d-none');
  // }, 2000);
}

/**
 * show all User from the global JSON array - users - that can be selected for a task
 */
function showAllUser() {
  document.getElementById('user').innerHTML = ``;
  for (let i = 1; i < users.length; i++) {
    let user = users[i];
    let showUser = document.getElementById('user');
    showUser.innerHTML += `<img title="${user.name}" id="selected${i}" onclick="selectUser(${i})" class="user-show  border border-white rounded-circle m-1" src="${user.avatar}" alt="">`;
  }
}

/**
 * select an avatar to choose a user to add a task
 * @param {string} i - this is the Person who is choose by clicking an avatar
 * creates a new element wich show only the user who is selected
 */
function selectUser(i) {
  document.getElementById(`selected${i}`).classList.toggle('user-selected');
  selectedUser = users[i];
  document.getElementById(`user`).innerHTML = /*html*/ ` 
    <div onclick="showAllUserAndDisable()"> 
      <img title="${selectedUser.name}" id="${i}" class="user-show rounded-circle user-selected" src="${selectedUser.avatar}" alt=""></div>`;
  document.getElementById('createTask').removeAttribute('disabled');
}

/**
 * function that show all user an disable the commit button, when no single user is selected
 */
function showAllUserAndDisable() {
  showAllUser();
  document.getElementById('createTask').disabled = true;
}

/**
 * load the current date, and formate it so it can use as a default value in the add Task formular
 */
function loadCurrentDate() {
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById('wichDate').innerHTML += /*html*/ `
  <input class="rounded fs-4 p-2 bs-simple add-Task-width" id="dateTask" placeholder="${today}" class="textbox-n" type="text" onfocus="(this.type='date')" >`;
}