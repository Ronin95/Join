let selectedUser = [];
let formAddTask = document.getElementById("addTaskSubmit");
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();

/**
 * Add a new task, by getting the values from document by id.
 * Safe in the JSON new Task.
 * Clear the input.
 * Show a message the Message with the value for wich Member is the task added.
 */
async function addTask() {
  allTasks = await loadFromBackend("allTasks");
  let date = document.getElementById("txtDate");
  let newTask = {
    title: getInputValue("title"),
    date: date.value,
    category: getInputValue("category"),
    urgency: getInputValue("urgency"),
    description: getInputValue("description"),
    userForTask: selectedUser,
    id: new Date().getTime(),
    state: "toDo",
  };
  getDate(newTask, date);
  saveTask(newTask);
}

/**
 * this is a function to get the new Date from value
 * @param {string} newTask
 * @param {number} date
 */
function getDate(newTask, date) {
  if ((newTask.date = !date.value)) {
    newTask.date = today;
  } else {
    newTask.date = date.value.replace(".", "/");
  }
}

/**
 * This is a function that returns a HTML Element with a certain id.
 * @param {string} id
 * @returns {HTMLElement} the id from the element
 */
function getInputValue(id) {
  return document.getElementById(id).value;
}

/**
 * save the new Task and push it to the JSON all Task
 * @param {string} newTask - This ist the JSON array that will be created
 * push the newTask into allTasks JSON array
 */
function saveTask(newTask) {
  allTasks.push(newTask);
  saveInBackend(allTasks, "allTasks");
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
  document.getElementById(`selected${i}`).classList.toggle("user-selected");
  selectedUser = users[i];
  document.getElementById(`user`).innerHTML = /*html*/ ` 
    <div onclick="showAllUserAndDisable()"> 
      <img title="${selectedUser.name}" id="${i}" class="user-show cursor-pointer rounded-circle user-selected" src="${selectedUser.avatar}" alt=""></div>`;
  document.getElementById("createTask").removeAttribute("disabled");
}

/**
 * function that show all users an disables the commit button, when no single user is selected
 */
function showAllUserAndDisable() {
  showAllUser();
  document.getElementById("createTask").disabled = true;
}

/**
 * load the current date, and formate it so it can use as a default value in the add Task formular
 */
function loadCurrentDate() {
  if (/^\d$/.test(dd)) {
    dd = "0" + dd;
  }
  if (/^\d$/.test(mm)) {
    mm = "0" + mm;
  }
  today = dd + "/" + mm + "/" + yyyy;
  document.getElementById("txtDate").value = today;
}

function handleForm(event) {
  const successToast = document.getElementById("success_task");
  event.preventDefault();
  const toast = new bootstrap.Toast(successToast);
  toast.show();
  formAddTask.reset();
  showAllUser();
  loadCurrentDate();
}
formAddTask.addEventListener("submit", handleForm);
