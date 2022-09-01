let currentUser = [];
let allCategories = ['IT', 'Sales', 'Management', 'Production', 'Marketing'];
let colorsCategory = {
  Sales: '#DC5445',
  IT: '#5F61B3',
  Production: '#C4A381',
  Management: '#E9E265',
  Design: '#BBD686',
  Marketing: '#EEF1BD',
};
let users = [];

async function init() {
  await setURL(
    'https://gruppe-293-join.developerakademie.net/smallest_backend_ever'
  );
  await downloadFromServer();
  users = (await JSON.parse(backend.getItem('users'))) || [];
  allTasks = (await JSON.parse(backend.getItem('allTasks'))) || [];
}

async function initIndex() {
  checkIfLogin();
  await init();
  await includeHTML();
  await currentUserImage();
  document.getElementById('navBoard').classList.add('you-are-here');
  renderAllColumns();
  // configDragDropPressHoldMode();
}

async function initHelp() {
  checkIfLogin();
  await init();
  await includeHTML();
  await currentUserImage();
  document.getElementById('navHelp').classList.add('you-are-here');
}

async function initBacklog() {
  checkIfLogin();
  await init();
  await includeHTML();
  await currentUserImage();
  generateAllTasks();
  document.getElementById('navInBacklog').classList.add('you-are-here');
}

async function initAddTask() {
  checkIfLogin();
  await init();
  await includeHTML();
  await currentUserImage();
  showAllUser();
  document.getElementById('addTaskNav').classList.add('you-are-here');
  loadCurrentDate();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute('w3-include-html'); // "header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = 'Page not found';
    }
  }
}
