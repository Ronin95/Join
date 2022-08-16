/**
 * converts the JSON into a string and stores it in the backend
 * @param {object} json
 * @param {string} key
 */
function saveInBackend(json, key) {
  let asString = JSON.stringify(json);
  localStorage.setItem(key, asString);
}

/**
 * downloads the data matching the key
 * @param {string} key the key with which something was saved in the backend
 * @returns gibt ein JSON zurück
 */
function loadFromBackend(key) {
  let asString = localStorage.getItem(key);
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
  currentUser = await loadFromBackend('currentUser');
  let currentUserProfile = document.getElementById('currentUser');
  currentUserProfile.src = users[currentUser].avatar;
}
