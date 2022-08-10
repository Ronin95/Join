function newTaskTemp(newTask) {
    return /*html*/ `
  <div class='b-style-dotted backlog-task-Container'>
    <div class='task-img-name-email b-style-dotted'>
      <img src='img/nikola.png' style='width: 80px;'>
      <div>
        <p id="user_name" ></p>
        <p id="user_email"></p>
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