let allTasks = [];


function addTask(){
    let title = document.getElementById('title');
    let date = document.getElementById('dateTask');
    let category = document.getElementById('category');
    let urgency = document.getElementById('urgency');
    let description = document.getElementById('description');
    let user = document.getElementById('user')
    let newTask = {
        'title': title.value,
        'date': date.value,
        'category': category.value,
        'urgency': urgency.value,
        'description': description.value,
        'user': user.value,
};
allTasks.push(newTask);
let allTasksAsString = JSON.stringify(allTasks);
localStorage.setItem('allTasks', allTasksAsString);
loadAllTasks(allTasks);
clearInput();
}


async function loadAllTasks(){
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
    document.getElementById('freshTask').innerHTML = '';
    for (let i = 0; i < allTasks.length; i++) {
      const task = allTasks[i];
    
    document.getElementById('freshTask').innerHTML += /*html*/ `
                <tr class="m-1 table-secondary table-row table-row-design d-flex">
                  <td class="left-rounded assigned-to-row">
                    <img
                      class="border rounded-circle assigned-img"
                      src="./img/maik.png"
                      alt="">
                    <div class="flex-it-column">
                      <span>${task.user}</span
                      ><span
                        ><a href="x">${task.user.replace(/\s+/g, '').toLowerCase()}@live.com</a></span
                      >
                    </div>
                  </td>
                  <td class="justify-content-center">${task.category}</td>
                  <td class="right-rounded justify-content-end">
                  ${task.description}
                  </td>
                </tr>    
    `};
}


function clearInput(){
    title.value = '';
    category.selectedIndex = 0;
    urgency.selectedIndex = 0;
    description.value = '';
}


async function init() {
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  await includeHTML();
  backend.setItem('Test', 'Hallo');
}