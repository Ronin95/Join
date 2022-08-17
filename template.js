function newTaskTemp(newTask, i) {
  return /*html*/ `
  <div class='d-flex'>
    <div class='d-flex mt-2 rounded bg-grey justify-content-sm-between w-100 align-items-center'>
      <div class='task-img-name-email '>
        <div style="background-color: ${
          colorsCategory[newTask.category]
        }" class='category-task'>
        </div>
        <div id="user_pic">
          <img class="user-pic m-3 rounded-circle" src="${
            newTask.userForTask.avatar
          }">
        </div>
        <div id="which_user">
          <p class="m-0">${newTask.userForTask.name}</p>
            <p class="mb-0">
              <a href='mailto:invalidmail@join.com' alt='Invalid Mail Address'>
                ${newTask.userForTask.email}
              </a>
            </p>
        </div >
      </div >
      <div class='taskCategory text-center width-200'>
        <h5 class="mb-0">${newTask.category}</h5>
      </div>
      <div class="">
        <p class="d-flex mb-0 me-4 width-200 hiddeneScrollbar details-container p-2 wrap-nowrap" id="backlogDetails${i}" onclick="showDetailsInBacklog(i)"><span>${
    newTask.description
  }</span></p>
      </div>
    </div >
    <div class='mt-4'>
      <img class='delete-task' onclick='deleteTask(${i})' src='img/delete-task.png'>
    </div>
  </div>

  `;
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
