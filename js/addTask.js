let selectedUser = [];
let formAddTask = document.getElementById('addTaskSubmit');
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
async function addTask() {
  allTasks = await loadFromBackend('allTasks');
  let title = document.getElementById('title');
  let date = document.getElementById('txtDate');
  let category = document.getElementById('category');
  let urgency = document.getElementById('urgency');
  let description = document.getElementById('description');
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
    newTask.date = date.value.replace('.', '/');
  }
  saveTask(newTask);
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
 * delete unsafed values from the inputs if the written or clicked are not really want to add
 */
function deleteUnsafedInput() {
  formAddTask.reset();
  showAllUser();
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

/* HAVE TO REWRITE for the new BOOTSRAP DATE*/
// function loadCurrentDate() {
//   if (dd < 10) {
//     dd = '0' + dd;
//   }
//   if (mm < 10) {
//     mm = '0' + mm;
//   }
//   today = yyyy + '/' + mm + '/' + dd;
//   document.getElementById('heute').innerHTML += /*html*/ `

// <!--
// <input id="txtDate" placeholder="${today}" required type="text" class="form-control text-left fs-4"> -->
//   <!-- <input class="rounded fs-4 p-2 bs-simple w-100" id="dateTask" placeholder="${today}" class="textbox-n" type="text" onfocus="(this.type='date')" > -->
//   `;
// }

function handleForm(event) {
  const successToast = document.getElementById('success_task');
  event.preventDefault();
  const toast = new bootstrap.Toast(successToast);
  toast.show();
  formAddTask.reset();
  showAllUser();
}
formAddTask.addEventListener('submit', handleForm);

$(document).ready(function () {
  $('.input-daterange').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
    calendarWeeks: true,
    clearBtn: true,
    disableTouchKeyboard: true,
  });
});
