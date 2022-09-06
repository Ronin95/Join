// BACKUP of users JSON in case it will be deleted from brackend server.
/* users = [
  {
    name: 'Guest',
    password: '000',
    avatar: './img/guest.png',
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
    avatar: './img/phil.png',
    email: 'phil@join.org',
  },
  {
    name: 'Maik Langer',
    password: '123',
    avatar: './img/maik.png',
    email: 'maik@join.org',
  },
]; */

/**
 * Checks if an email address and password are entered. Then login() is called.
 */
function verifyNull() {
  let email = document
    .getElementById("floatingEmail")
    .value.trim()
    .toLowerCase();
  let password = document.getElementById("floatingPassword").value.trim();
  if (!email.length && !password.length) {
    toastForEvent("toast-body-signIn", "Please enter something!");
  } else if (!email.length) {
    toastForEvent("toast-body-signIn", "Please enter email!");
  } else if (!password.length) {
    toastForEvent("toast-body-signIn", "Please enter password!");
  } else {
    login(email, password);
  }
}

/**
 * Checks if the entered email address and password match the array 'users'. If so, loginAsUser() is executed.
 * @param {email} email - The e-mail address of the logging user.
 * @param {password} password - The password of the logging user.
 */
function login(email, password, toastBody) {
  let checkEmail = false;
  let checkPassword = false;
  for (let i = 0; i < users.length; i++) {
    if (email.toLowerCase() == users[i].email.toLowerCase()) {
      checkEmail = true;
      if (password == users[i].password) {
        checkPassword = true;
        loginAsUser(i);
      }
    }
  }
  validationLogin(checkEmail, checkPassword, toastBody);
}

/**
 * Selects the desired container using the id and inserts a string as the toast message.
 * @param {number} containerId - The id of the container.
 * @param {string} text - The text inserted to be loaded into the toast
 */
function toastForEvent(containerId, text) {
  let toastBody = document.getElementById(containerId);
  toastBody.innerHTML = "";
  toastBody.innerHTML = text;
}

/**
 * Validates the email and password and redirects to index.html if this is the case.
 * @param {boolean} checkEmail - The result of the e-mail address validation of the login to the app.
 * @param {boolean} checkPassword - The result of the password validation of the login to the app.
 */
function validationLogin(checkEmail, checkPassword, toastBody) {
  if (checkEmail && checkPassword) {
    localStorage.setItem("isLoggedIn", true);
    location.href = "index.html";
  } else if (!checkEmail) {
    toastForEvent(
      "toast-body-signIn",
      "Wrong email adress! Please check your input"
    );
  } else if (!checkPassword) {
    toastForEvent(
      "toast-body-signIn",
      "Wrong password! Please check your input"
    );
  }
}

/**
 * Pushes in currentUser the logged in user
 * @param {number} i - The reference which user is logged in.
 */
function loginAsUser(i) {
  localStorage.setItem("currentUser", i);
}

/**
 * Pushes in currentUser the logged in users
 * @param {number} i - The reference which user is logged in.
 */
function loginAsGuest() {
  document.getElementById("floatingEmail").value = "guest@join.org";
  document.getElementById("floatingPassword").value = "000";
  loginAsUser(0);
  validationLogin(true, true);
}

/**
 * Saves the information in the JSON 'users' as a new user.
 */
function saveRegristration() {
  users = loadFromBackend("users");
  let firstName = document.getElementById("floatingFirstNameRegister");
  let lastName = document.getElementById("floatingLastNameRegister");
  let email = document.getElementById("floatingEmailRegister");
  let password = document.getElementById("floatingPasswordRegister1");
  let avatar = checkSelectedAvatar();
  let registration = {
    name: firstName.value + " " + lastName.value,
    password: password.value,
    avatar: avatar.src,
    email: email.value,
  };
  users.push(registration);
  saveInBackend(users, "users");
}

/**
 * Checks which HTML element was chosen as avatar.
 * @returns {HTMLElement} The return value is the chosen HTML element as avatar.
 */
function checkSelectedAvatar() {
  for (let i = 1; i < 5; i++) {
    let worker = document.getElementById(`worker${i}`);
    if (worker.classList.contains("border-danger")) {
      return worker;
    }
  }
}

/**
 * Checks whether both password are identical.
 */
function checkPassword() {
  let password1 = document.getElementById("floatingPasswordRegister1");
  let password2 = document.getElementById("floatingPasswordRegister2");
  if (password2.value == password1.value) {
    password2.classList.add("is-valid");
    password2.classList.remove("is-invalid");
  } else {
    password2.classList.add("is-invalid");
    password2.classList.remove("is-valid");
  }
}

/**
 * Shows and hides password by checkbox.
 */
function showPassword() {
  let passwords = document.querySelectorAll('input[placeholder="Password"]');
  passwords.forEach((password) => {
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  });
}

/**
 * Highlights the chosen avatar.
 */
function highlightAvatar() {
  for (let i = 1; i < 5; i++) {
    let gridRadio = document.getElementById(`gridRadios${i}`);
    if (gridRadio.checked) {
      document.getElementById(`worker${i}`).classList.add("border-danger");
      document.getElementById(`worker${i}`).classList.remove("border-light");
    } else {
      document.getElementById(`worker${i}`).classList.remove("border-danger");
      document.getElementById(`worker${i}`).classList.add("border-light");
    }
  }
}

/**
 * The toast output after the input has been checked after the click on the trigger (here: sign in button).
 */
const toastTrigger1 = document.getElementById("signInBtn");
const toastLiveExample1 = document.getElementById("signInToast");
if (toastTrigger1) {
  toastTrigger1.addEventListener("click", () => {
    verifyNull();
    const toast = new bootstrap.Toast(toastLiveExample1);
    toast.show();
  });
}

/**
 * This is a bootstrap modal object used on the the login page.
 * @type {Object}
 * */
let myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));

/**
 * The HTML form element defining the type and scope of the HTML validation of the login modal.
 * @type {HTMLFormElement}
 * */
let formRegistery = document.getElementById("registery");

/**
 * The HTML element of the bootstrap toast on the login page.
 * @type {HTMLElement}
 * */
const registrationToast = document.getElementById("registrationToast");

/**
 * When the form is submitted, the function is executed. It shows the toast, saves the registered user and closes the modal after 2 seconds.
 * @param {event} event returns the event
 */
function handleFormLogin(event) {
  event.preventDefault();
  toastForEvent("toast-body-registration", "Registration completed!");
  const toast = new bootstrap.Toast(registrationToast);
  toast.show();
  saveRegristration();
  formRegistery.reset();
  setTimeout(function () {
    myModal.hide();
  }, 2000);
}

/**
 * Listener of the HTML form validation element of the modal on the login page,
 * which 'listens' to the submit event of it and executes the function handleFormLogin().
 *
 * @listens {event} submit - This is the submit event of the HTML form validation element of the modal on the login page.
 */
formRegistery.addEventListener("submit", handleFormLogin);
