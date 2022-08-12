/* LUKAS: Ich glaube, diese Var muss später in eine zentrale Script Datei wi z.B: script.js verschoben werden 
(d.h. für alle Subseiten und somit deren spezifische Scripte zentralisiert werden),
da ich z.B. auch allTask im Board nutze. Aber um es anwenden zu können, muss MOMENTAN allTask.js in index.html eingebunden sein,
was m.M.n ein wenig "überflüssig" ist.*/
let allTasks = [];
let selectedUser = [];

function addTask() {
  loadAllTasks();
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
    /* Lukas 11.08: Wie gestern besprochen, diese Variable muss zu selectedUser geändert werden 
    und in users (aus script.js / Phli LogIn Seite) gespeichert werden, damit die Verlinkung nach der gestern abgesprochene Methode
    in Board funktioniert und damit die Tasks überhauptangezeigt werden. */
    userForTask: selectedUser,
    id: id++,
    /* Lukas 11.08: Ergäntzt, da sonst die Tasks im Board aus dem LocalStorage nicht in die Spalten geladen werden. 
    "Er weisst nicht, wohin mit den Tasks beim Rendern, in welche Spalte?"  */
    state: 'toDo',
  };
  saveTask(newTask);
  clearInput();
  doneIt();
}

async function initX() {
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  await includeHTML();
  backend.setItem('Test', 'Hallo');
}

/* Lukas 11.08: Die Save UND LOAD Funktion müssten ein wenig angepasst werden, 
dass auch die Änderungen: Kategorie-Wechsel beim Board den alten Stand von allTasks local und im Backed überspeichert
und danach vor dem Rendern der neue Stand in allen Subseiten erneut geleden wird. 

Die sollten wir @Maik gemeinsam besprechen/anpassen. */
function saveTask(newTask) {
  allTasks.push(newTask);
  saveAllTasks();
}

/* Lukas 11.08: Alte Version der Load Funktion: Für meine Zwecke, damit Board überhaupt funktioniert. Board kennt keine selectedUser. */
/* function loadAllTask() {
  let task = localStorage.getItem("Task"); if (task) {
    allTasks = JSON.parse(task);
  }
} */

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
    showUser.innerHTML += `<img id="selected${i}" onclick="selectUser(${i})" class="user-show" src="${user.avatar}" alt="">`;
  }
}

function selectUser(i) {
  document.getElementById(`selected${i}`).classList.toggle('user-selected');

  selectedUser = users[i];
  if (selectedUser.includes(users[i])) {
    selectedUser = selectedUser.filter((a) => a != users[i]);
  } else {
    selectedUser = users[i];
  }
}
