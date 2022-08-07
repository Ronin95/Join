let allTasks = [];


function addTask(){
    let title = document.getElementById('title');
    let date = document.getElementById('dateTask');
    let category = document.getElementById('category');
    let urgency = document.getElementById('urgency');
    let description = document.getElementById('description');
    let newTask = {
        "title": title.value,
        "date": date.value,
        "category": category.value,
        "urgency": urgency.value,
        "description": description.value,
};
allTasks.push(newTask);

let allTasksAsString = JSON.stringify(allTasks);
localStorage.setItem('allTasks', allTasksAsString);

clearInput();
init();

}

function loadAllTasks(){
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
    console.log(allTasks);
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