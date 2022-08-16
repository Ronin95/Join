function newTaskTemp(newTask, i) {
  return /*html*/ `
  <div class='overall-backlog'>
    <div class=' backlog-task-Container'>
      <div class='task-img-name-email '>
        <div style="background-color: ${
          colorsCategory[newTask.category]
        }" class='category-task'>

        </div>
        <div id="user_pic">
          <img class="user-pic m-3" src="${newTask.userForTask.avatar}">
        </div>
        <div id="which_user">
          <p>${newTask.userForTask.name}</p>
            <p>
              <a href='mailto:invalidmail@join.com' alt='Invalid Mail Address'>
                ${newTask.userForTask.email}
              </a>
            </p>
        </div >
      </div >
      <div class='taskCategory'>
        <h5>${newTask.category}</h5>
      </div>
      <div class='taskDescription '>
        <p>${newTask.description}</p>
      </div>
    </div >
    <div class='mt-4'>
      <img class='delete-task' onclick='deleteTask(${i})' src='img/delete-task.png' style='width: 50px;'>
    </div>
  </div>
  `;
}

function deleteTask(i) {
  allTasks.splice(i, 1);
  saveInBackend(allTasks, 'allTasks');
  allTasks = loadFromBackend('allTasks');
  generateAllTasks();
}

function searchTaskTemp(newTask) {
  return /*html*/ `
  <div class=' backlog-task-Container'>
    <div class='task-img-name-email '>
      <div style="background-color: 
        ${colorsCategory[newTask.category]}"
        class='category-task'>
      </div>
      <div id="user_pic">
        <img class="user-pic m-3" src="${newTask.userForTask.avatar}">
      </div>
      <div id="which_user">
        <p>${newTask.userForTask.name}</p>
          <p>
            <a href='mailto:invalidmail@join.com' alt='Invalid Mail Address'>
              ${newTask.userForTask.email}
            </a>
          </p>
      </div >
    </div >
    <div class='taskCategory'>
      <h5>${newTask.category}</h5>
    </div>
    <div class='taskDescription '>
      <p>${newTask.description}</p>
    </div>
  </div >
  `;
}
