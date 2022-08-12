async function initBacklog() {
  /* Lukas 11.08: warum muss hier loaskTask gemacht werden, wenn loadAllTaksk
  bereits loadTask mit beinhaltet? */
  includeHTML();
  generateAllTasks();
  // loadUserinBacklog();
}

function generateAllTasks() {
  loadAllTasks();
  for (let i = 0; i < allTasks.length; i++) {
    let newTask = allTasks[i];
    let newTasks = document.getElementById('freshTask');
    newTasks.innerHTML += newTaskTemp(newTask, i);
  }
}
