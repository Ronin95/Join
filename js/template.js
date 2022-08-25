function newTaskTemp(newTask, i) {
  return /*html*/ `
<div class="d-flex position-relative align-items-sm-center border-1 rounded bg-grey mb-4">
  <div 
    style="background-color:${colorsCategory[newTask.category]}"
    class="category-task position-absolute top-0 bottom-0"
    title="${newTask.category}"></div>
  <div
    class="d-flex justify-content-sm-between justify-content-around w-100 align-items-center flex-column flex-sm-row ms-4"
  >
    <div class="d-flex align-items-center flex-column flex-sm-row me-sm-0">
        <div>
          <img
            class="user-show m-sm-3 m-2 rounded-circle "
            src="${newTask.userForTask.avatar}"
          />
        </div>
        <div class="d-flex flex-column align-items-center align-items-sm-start mb-2 mb-sm-0">
          <p class="m-0">${newTask.userForTask.name}</p>
            <a 
            class="m-0" 
            href="mailto:${newTask.userForTask.email}" 
            alt="${newTask.userForTask.email}">
              ${newTask.userForTask.email}
            </a>          
        </div>
      </div>
      <div class="d-none d-sm-block text-center">
        <h5 class="mb-0 m-2">${newTask.category}</h5>
      </div>
      <div class="d-flex justify-content-center justify-content-sm-end align-items-center flex-sm-row flex-column ms-1 ms-sm-0 mb-2 mb-sm-0">
        <div
          class="d-flex justify-content-center align-items-center justify-content-sm-end align-items-sm-start flex-sm-row flex-column me-sm-2 cursor-pointer"
          id="backlogDetails${i}"
        >
          <b class="d-block d-sm-none blue-text text-uppercase">Description: </b>
          <span class=" hiddenScrollbar overflow-auto text-center text-sm-end text-break max-height-100 width-150">${
            newTask.description
          }</span>
        </div>
      </div>      
    </div>
    <div class="d-flex justify-content-centerpt-sm-0">
      <button
        type="button"
        onclick="deleteTask(${i})"
        class="btn-close  p-2 m-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
</div>`;
}
