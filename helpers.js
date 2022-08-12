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
