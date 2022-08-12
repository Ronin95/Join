

/* LUKAS: Ich glaube, diese Var muss später in eine zentrale Script Datei wi z.B: script.js verschoben werden 
(d.h. für alle Subseiten und somit deren spezifische Scripte zentralisiert werden),
da ich z.B. auch allTask im Board nutze. Aber um es anwenden zu können, muss MOMENTAN allTask.js in index.html eingebunden sein,
was m.M.n ein wenig "überflüssig" ist.*/
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
    /* Lukas 11.08: Wie gestern besprochen, diese Variable muss zu selectedUser geändert werden 
    und in users (aus script.js / Phli LogIn Seite) gespeichert werden, damit die Verlinkung nach der gestern abgesprochene Methode
    in Board funktioniert und damit die Tasks überhauptangezeigt werden. */
    selectedUser: users[user.value],
    id: id++,
    /* Lukas 11.08: Ergäntzt, da sonst die Tasks im Board aus dem LocalStorage nicht in die Spalten geladen werden. 
    "Er weisst nicht, wohin mit den Tasks beim Rendern, in welche Spalte?"  */
    state: 'toDo'
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


/* Lukas 11.08: Die Save UND LOAD Funktion müssten ein wenig angepasst werden, 
dass auch die Änderungen: Kategorie-Wechsel beim Board den alten Stand von allTasks local und im Backed überspeichert
und danach vor dem Rendern der neue Stand in allen Subseiten erneut geleden wird. 

Die sollten wir @Maik gemeinsam besprechen/anpassen. */
function saveTask(newTask) {
  allTasks.push(newTask);
  let task = JSON.stringify(allTasks);
  localStorage.setItem("Task", task);
}


/* Lukas 11.08: Alte Version der Load Funktion: Für meine Zwecke, damit Board überhaupt funktioniert. Board kennt keine selectedUser. */
/* function loadTask() {
  let task = localStorage.getItem("Task"); if (task) {
    allTasks = JSON.parse(task);
  }
} */


/* Lukas 11.08: warum brauchen wir noch eine Var hier selectedUser, wenn wir schon im script.js users haben? */
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
  if (allTasks.length === 0) {
    let noTask = document.getElementById('freshTask');
    noTask.innerHTML += /*html*/`
    <div class='mt-5'>
      <h1>No Tasks available.</h1>
      <h2>Please enter a task into <a href=addTask.html>Add Task</a>.</h2>
    </div>
    `;
  } else {
    for (let i = 0; i < selectedUser.length; i++) {
      let user = selectedUser[i];
      let userChoice = document.getElementById('which_user');
      let userPic = document.getElementById('user_pic');
      userPic.innerHTML += /*html*/`
        <img class="backlog-img" src="${user.avatar}" alt="">
      `;
      userChoice.innerHTML += /*html*/ ` 
        <p>${user.name}</p>
        <p>
          <a href='mailto:invalidmail@join.com' alt='Invalid Mail Address'>
            ${user.name.toLowerCase().replace(' ', '.')}@join.com
          </a>
        </p>`;
    }
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
