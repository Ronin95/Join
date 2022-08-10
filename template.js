function newTaskTemp(newTask) {
    return /*html*/ `
  <div class='b-style-dotted backlog-task-Container'>
    <div class='task-img-name-email b-style-dotted'>
      <div id="user_pic"></div>
      <div id="wich_user">

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