let allTasks = [];

function addTask() {
  let title = document.getElementById("title");
  let date = document.getElementById("dateTask");
  let category = document.getElementById("category");
  let urgency = document.getElementById("urgency");
  let description = document.getElementById("description");
  let user = document.getElementById("user");
  let newTask = {
    title: title.value,
    date: date.value,
    category: category.value,
    urgency: urgency.value,
    description: description.value,
    user: user.value,
  };
  // The above array creates the base structure as to how of an
  // array we want to save from addTask.html that can then be displayed
  // in backlog.html
  saveTask(newTask); // save the array
  clearInput(); // clear the fields that were previously inputed by the user
}

// if the allTasks array is empty display that the user has to add a new task
// Else display the Task that the user already entered in AddTask
function loadAllTasks() {
  loadTask();
  for (let i = 0; i < allTasks.length; i++) {
    let newTask = allTasks[i];
      let newTasks = document.getElementById("freshTask");
      newTasks.innerHTML += /*html*/ `
        <div class='b-style-dotted backlog-task-Container'>
          <div class='task-img-name-email b-style-dotted'>
            <img src='img/nikola.png' style='width: 80px;'>
            <div>
              <p>${newTask.user}</p>
              <p>${newTask.user}@join.com</p>
            </div>
          </div>
          <div class='b-style-dotted taskCategory'>
            <h5>${newTask.category}</h5>
          </div>
          <div class='taskDescription b-style-dotted'>
            <p>${newTask.description}</p>
        </div>
           </div>
      `;
  }
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
  allTasks = JSON.parse(task);
}

function clearInput() {
  title.value = "";
  category.selectedIndex = 0;
  urgency.selectedIndex = 0;
  description.value = "";
}
