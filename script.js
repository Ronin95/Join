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

let users = [
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

async function init() {
  // await downloadFromServer();
  // allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  await includeHTML();
  // LUKAS 04.08.22 16:06: I have commented it out because this ID (so far) is not used and causes error the console.
  // document.getElementById('headline').innerHTML = 'Herzlich willkommen!';
  // backend.setItem();
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

async function initAddTask() {
  await includeHTML();
  showAllUser();
}
