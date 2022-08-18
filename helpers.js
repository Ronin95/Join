/**
 * Checks whether the visitor is logged in and whether the login period has not expired.
 */
function checkIfLogin() {
  let check = JSON.parse(localStorage.getItem('isLoggedIn'));
  let hours = 1;
  let now = new Date().getTime();
  let setupTime = localStorage.getItem('setupTime');
  if (!setupTime && check) {
    localStorage.setItem('setupTime', now);
  } else if (now - setupTime > hours * 60 * 60 * 1000 || !check) {
    localStorage.removeItem('setupTime');
    location.href = 'login.html';
  }
}

/**
 * Deletes the selected task from the array
 * @param {number} i indicates the location of the object in the array
 */
function deleteTask(i) {
  allTasks.splice(i, 1);
  saveInBackend(allTasks, 'allTasks');
  allTasks = loadFromBackend('allTasks');
  generateAllTasks();
}

/**
 * converts the JSON into a string and stores it in the backend
 * @param {object} json
 * @param {string} key
 */
function saveInBackend(json, key) {
  let asString = JSON.stringify(json);
  backend.setItem(key, asString);
}

/**
 * downloads the data matching the key
 * @param {string} key the key with which something was saved in the backend
 * @returns gibt ein JSON zurück
 */
function loadFromBackend(key) {
  let asString = backend.getItem(key);
  if (asString) {
    return JSON.parse(asString);
  } else {
    return [];
  }
}

/**
 * loads the avatar of the current user
 */
async function currentUserImage() {
  currentUser = localStorage.getItem('currentUser');
  let currentUserProfile = document.getElementById('currentUser');
  currentUserProfile.src = users[currentUser].avatar;
}
