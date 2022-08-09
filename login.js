let users = [
  {
    name: 'Phil Schmucker',
    password: '123',
    avatar: '../img/Phil.jpg',
    email: 'phil@join.org',
  },
];

function login() {
  let email = document.getElementById('inputEmail3');
  let password = document.getElementById('inputPassword3');
  let checkEmail = false;
  let checkPassword = false;
  for (let i = 0; i < users.length; i++) {
    if (email.value == users[i].email) {
      checkEmail = true;
    }
    if (password.value == users[i].password) {
      checkPassword = true;
    }
  }
  if (checkEmail && checkPassword) {
    //load index.html (init)
  } else if (!checkEmail) {
    toastWrongEmail();
  } else if (!checkPassword) {
    toastWrongPassword();
  }
}

function toastWrongEmail() {}

function toastWrongPassword() {}
