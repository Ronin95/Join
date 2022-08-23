let currentUser = [];

/* General all posible variables / arrays like categories, users, avatars etc., which are used in every sub page und script */
/* Lukas 11.08: Sollen wir auch die Kategorien zentalisieren, ähnlich wie bei users und selectedUser, 
oder soll ein lokales Board Array sein.
Ich brauch auch hier
*/
let allCategories = ['IT', 'Sales', 'Management', 'Production', 'Marketing'];

/* Wenn der gleiche Style für die Kategorien Items/Badges noch irgendwo genasuo wie 
im Board bei den Task Items im Card Header benutzt wird, 
dann sollte es auch als ein general Array zentralisiert werden. 
 */
/* let bsClassesForCategory = ['secondary', 'primary', 'danger', 'success', 'warning', 'info',]; */

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
  renderAllColumns();
  showAllUser();
  selectUser(1);
  // document.getElementById('navBoard').classList.add('you-are-here');
}

async function initHelp() {
  checkIfLogin();
  await init();
  await includeHTML();
  await currentUserImage();
  // document.getElementById('navHelp').classList.add('you-are-here');
}

async function initBacklog() {
  checkIfLogin();
  await init();
  await includeHTML();
  await currentUserImage();
  generateAllTasks();
  // document.getElementById('navInBacklog').classList.add('you-are-here');
}

async function initAddTask() {
  checkIfLogin();
  await init();
  await includeHTML();
  await currentUserImage();
  showAllUser();
  loadCurrentDate();
  // document.getElementById('addTaskNav').classList.add('you-are-here');
}

function logout() {
  localStorage.setItem('isLoggedIn', false);
  localStorage.removeItem('currentUser');
  location.href = 'login.html';
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
