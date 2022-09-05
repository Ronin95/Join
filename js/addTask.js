let selectedUser = [];
let formAddTask = document.getElementById("addTaskSubmit");
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
function getDate(newTask, date){
  if ((newTask.date = !date.value)) {
    newTask.date = today;
  } else {
    newTask.date = date.value.replace(".", "/");
  }
}

/**
 * this is a function that return the document
 * @param {string} id 
 * @returns the id from the element
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

/* HAVE TO REWRITE for the new BOOTSRAP DATE*/
function loadCurrentDate() {
  if (/^\d$/.test(dd)) {
    dd = "0" + dd;
  }
  if (/^\d$/.test(mm)) {
    mm = "0" + mm;
  }
  today = dd + "/" + mm + "/" + yyyy;
  document.getElementById("txtDate").value = today;
  // document.getElementById('today').innerHTML += /*html*/ `
  // <div class="today-date d-flex justify-content-center flex-column">
  //   <span class="d-flex justify-content-end ">TODAY</span>
  //   <span class="today-date d-flex justify-content-center">${today} </span>
  // </div>
  // `;
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
