let tasks = [];


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
tasks.push(newTask);
clearInput();
console.log(tasks)
}

function clearInput(){
    title.value = '';
    category.selectedIndex = 0;
    urgency.selectedIndex = 0;
    description.value = '';
}