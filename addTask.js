let allTasks = [{
  'title': 'Test_Title',
  'date': '2022-08-10',
  'category': 'Sales',
  'urgency': 'Low',
  'description': 'Test_Text',
  'user': 'Nikola Badjevic'
}];

function addTask() {
  let title = document.getElementById('title');
  let date = document.getElementById('dateTask');
  let category = document.getElementById('category');
  let urgency = document.getElementById('urgency');
  let description = document.getElementById('description');
  let user = document.getElementById('user');
  // The above 6 lines of code only refer to the id field in the html
  let newTask = {
    'title': title.value,
    'date': date.value,
    'category': category.value,
    'urgency': urgency.value,
    'description': description.value,
    'user': user.value,
  };
  // The above array creates the base structure as to how of an
  // array we want to save from addTask.html that can then be displayed
  // in backlog.html
  saveTask(newTask); // save the array
  clearInput(); // clear the fields that were previously inputed by the user
}

function saveTask(newTask) {
  allTasks.push(newTask);
  let task = JSON.stringify(allTasks); 
  localStorage.setItem('Task', task);
}

// if the allTasks array is empty display that the user has to add a new task
// Else display the Task that the user already entered in AddTask
function loadAllTasks() {
  if (allTasks.length === 0) {
    let noTask = document.getElementById('freshTask');
    noTask.innerHTML += /*html*/`
      <h1>Please add a new Task into Add Task</h1>
    `;
  } else {
    for (let i = 0; i < allTasks.length; i++) {
      let newTasks = allTasks[i];
      
    
      console.log(allTasks);
      let newTask = document.getElementById('freshTask');
      newTask.innerHTML += /*html*/`
      <div class='b-style-dotted backlog-task-Container'>
        <div class='task-img-name-email b-style-dotted'>
          <img src='img/nikola.png' style='width: 80px;'>
          <div>
            <p>${newTasks['user']}</p>
            <p>${newTasks['user'].replace(' ', '.')}@join.com</p>
          </div>
        </div>
        <div class='b-style-dotted taskCategory'>
          <h5>${newTasks['category']}</h5>
        </div>
        <div class='taskDescription b-style-dotted'>
          <p>${newTasks['description']}</p>
      </div>
    </div>
    `;
  }
}
}

function clearInput() {
  title.value = '';
  category.selectedIndex = 0;
  urgency.selectedIndex = 0;
  description.value = '';
}

async function initX() {
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  await includeHTML();
  backend.setItem('Test', 'Hallo');
}