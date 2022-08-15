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
  // await downloadFromServer();
  // allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  await includeHTML();
  users = loadFromBackend('users');
  await currentUserImage();
  // checkIfLogin();
  document.getElementById('navBoard').classList.add('you-are-here');
  // LUKAS 04.08.22 16:06: I have commented it out because this ID (so far) is not used and causes error the console.
  // document.getElementById('headline').innerHTML = 'Herzlich willkommen!';
  // backend.setItem();
}

async function initHelp() {
  await includeHTML();
  users = loadFromBackend('users');
  await currentUserImage();
  // checkIfLogin();
  document.getElementById('navHelp').classList.add('you-are-here');
}

async function initBacklog() {
  await includeHTML();
  users = loadFromBackend('users');
  await currentUserImage();
  generateAllTasks();
  // checkIfLogin();
  document.getElementById('navInBacklog').classList.add('you-are-here');
}

async function initAddTask() {
  await includeHTML();
  users = loadFromBackend('users');
  await currentUserImage();
  // checkIfLogin();
  showAllUser();
  loadCurrentDate();
  document.getElementById('addTaskNav').classList.add('you-are-here');
}

function initLogin() {
  users = [
    {
      name: 'Guest',
      password: '000',
      avatar: './img/worker1.png',
      email: 'guest@join.org',
    },
    {
      name: 'Lukas Erdmanski',
      password: '123',
      avatar: './img/lukas.png',
      email: 'lukas@join.org',
    },
    {
      name: 'Nikola Badjevic',
      password: '123',
      avatar: './img/nikola.png',
      email: 'nikola@join.org',
    },
    {
      name: 'Phil Schmucker',
      password: '123',
      avatar: './img/Phil.jpg',
      email: 'phil@join.org',
    },
    {
      name: 'Maik Langer',
      password: '123',
      avatar: './img/maik.png',
      email: 'maik@join.org',
    },
  ];
  saveInBackend(users, 'users');
}

function checkIfLogin() {
  if (
    localStorage.getItem('isLoggedIn') == null ||
    localStorage.getItem('isLoggedIn') == false
  ) {
    location.href = 'login.html';
  }
}

function logout() {
  localStorage.setItem('isLoggedIn', false);
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
