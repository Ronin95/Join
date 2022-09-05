/**
 * Checks whether the visitor is logged in and whether the login period has not expired.
 */
function checkIfLogin() {
  let check = JSON.parse(localStorage.getItem("isLoggedIn"));
  let hours = 1;
  let now = new Date().getTime();
  let setupTime = localStorage.getItem("setupTime");
  if (!setupTime && check) {
    localStorage.setItem("setupTime", now);
  } else if (now - setupTime > hours * 60 * 60 * 1000 || !check) {
    localStorage.removeItem("setupTime");
    location.href = "login.html";
  }
}

/**
 * Deletes the selected task from the array
 * @param {number} i indicates the location of the object in the array
 */
function deleteTask(i, fct) {
  allTasks.splice(i, 1);
  saveInBackend(allTasks, "allTasks");
  fct();
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
 * @returns a JSON
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
 * show all User from the global JSON array - users - that can be selected for a task
 */
function showAllUser() {
  document.getElementById("user").innerHTML = ``;
  for (let i = 1; i < users.length; i++) {
    let user = users[i];
    let showUser = document.getElementById("user");
    showUser.innerHTML += generateUsers(user, i);
  }
}

/**
 * loads the avatar of the current user
 */
async function currentUserImage() {
  currentUser = localStorage.getItem("currentUser");
  let currentUserProfile = document.getElementById("currentUser");
  currentUserProfile.src = users[currentUser].avatar;
}

/**
 * logout the user and return to the login.html
 */
function logout() {
  localStorage.setItem("isLoggedIn", false);
  localStorage.removeItem("currentUser");
  location.href = "login.html";
}

/**
 * reads the urgency and assigns a corresponding color class
 * @param {string} taskUrgency indicates the urgency of the respective task
 */
function urgencyCol(taskUrgency) {
  if (taskUrgency == "High") {
    document.getElementById("boardUrgency").className = "red-modal";
  } else if (taskUrgency == "Medium") {
    document.getElementById("boardUrgency").className = "yellow-modal";
  } else {
    document.getElementById("boardUrgency").className = "green-modal";
  }
}

/**
 * reads the urgency and assigns a corresponding class
 * @param {string} taskUrgency indicates the urgency of the respective task
 * @param {string} id indicates the id of the respective task
 */
function urgencyBoard(taskUrgency, id) {
  if (taskUrgency == "High") {
    document.getElementById(id).classList.add("red");
  } else if (taskUrgency == "Medium") {
    document.getElementById(id).classList.add("yellow");
  } else {
    document.getElementById(id).classList.add("green");
  }
}

/**
 * Change the color in the top right corner of the triagle according to the selected urgency in the modal.
 */
function changeModalUrgencyColor() {
  let urgency = document.getElementById("modalUrgency").value;
  urgencyCol(urgency);
}

/**
 * Set dynamically the height of the scrollbar content of the sub pages (Backlog, Add Task, Help) on resize of the window.
 */
window.addEventListener("resize", function () {
  setHeight("freshTask");

  if (window.innerWidth < 503) {
    setHeight("addTaskSubmit");
  } else {
    removeHeight("addTaskSubmit");
  }

  setHeight("helpScrollbarContent1");
  setHeight("helpScrollbarContent2");
});

/**
 * Set the height of the scrollbar content of the sub spages (Backlog, Add Task, Help).
 *
 * @param {string} id - This is the id of the html element for which the height is set.
 */
function setHeight(id) {
  let elToFind = document.getElementById(id);

  if (elToFind != null) {
    let el = elToFind;
    let yDelta = el.getBoundingClientRect().y;
    let heightToSet = Math.floor(window.innerHeight - yDelta - 16);
    el.style.setProperty("height", `${heightToSet}px`, "important");
    el.style.setProperty("max-height", `${heightToSet}px`, "important");
  }
}

/**
 * Remove the height of the scrollbar content of the sub page (Add Task).
 *
 * @param {string} id - This is the id of the html element for which the height is removed.
 */
function removeHeight(id) {
  let elToFind = document.getElementById(id);

  if (elToFind != null) {
    let el = elToFind;
    el.style.removeProperty("height");
    el.style.removeProperty("max-height");
  }
}

/**
 * Show the logout button.
 */
function showExitDoor() {
  if (window.innerWidth >= 767) {
    document.getElementById("door").classList.add("door-visible");
  }
}

/**
 * Hide the logout button.
 */
function hideExitDoor() {
  if (window.innerWidth >= 767) {
    document.getElementById("door").classList.remove("door-visible");
  }
}

/**
 * Switch the visbility of the logout button.
 */
function switchExitDoor() {
  if (window.innerWidth < 768) {
    document.getElementById("door").classList.toggle("door-visible");
  }
}
