setURL('https://gruppe-293-join.developerakademie.net/smallest_backend_ever');
let allTasks = [];

async function init() {
  await downloadFromServer();
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  await includeHTML();
  // LUKAS 04.08.22 16:06: I have commented it out because this ID (so far) is not used and causes error the console.
  // document.getElementById('headline').innerHTML = 'Herzlich willkommen!';
  backend.setItem('Test', 'Hallo');
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
