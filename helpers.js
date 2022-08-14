function saveAllTasks() {
  let task = JSON.stringify(allTasks);
  localStorage.setItem('allTasks', task);
}

function loadAllTasks() {
  let task = localStorage.getItem('allTasks');
  if (task) {
    allTasks = JSON.parse(task);
  }
}

function saveInBackend(json, key) {
  let asString = JSON.stringify(json);
  localStorage.setItem(key, asString);
}

function loadFromBackend(json, key) {
  let asString = localStorage.getItem(key);
  if (asString) {
    json = JSON.parse(asString);
  }
}
