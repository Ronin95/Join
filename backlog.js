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
    let newTasks = document.getElementById("freshTask");
    newTasks.innerHTML += newTaskTemp(newTask, i);
  }
}

function filterNames() {
  let search = document.getElementById("searchTask").value;
  search = search.toLowerCase();
  document.getElementById("freshTask").innerHTML = ``;
  for (let i = 0; i < allTasks.length; i++) {
    let newTask = allTasks[i];
    let name = allTasks[i].userForTask.name;
    let category = allTasks[i].category;
    if (name.toLowerCase().includes(search) || category.toLowerCase().includes(search))
    {document.getElementById("freshTask").innerHTML += searchTaskTemp(newTask)
    }
  }
}
