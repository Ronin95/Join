/* General all posible variables / arrays like categories, users, avatars etc., which are used in every sub page und script */
let allCategories = ['IT', 'Sales', 'Management', 'Production', 'Marketing', 'Marketing'];

/* Wenn der gleiche Style für die Kategorien Items/Badges noch irgendwo genasuo wie 
im Board bei den Task Items im Card Header benutzt wird, 
dann sollte es auch als ein general Array zentralisiert werden. 
 */
/* let bsClassesForCategory = ['secondary', 'primary', 'danger', 'success', 'warning', 'info',]; */

let allUsers = ['Lukas Erdmanski', 'Nikola Badjevic', 'Phil Schmucker', 'Maik Lange'];
let allUsersAvatars = ['/img/lukas.png', '/img/nikola.png', '/img/Phil.jpg', '/img/maik.png'];

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
