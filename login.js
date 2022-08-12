function verifyNull() {
  let email = document.getElementById('floatingEmail').value.trim();
  let password = document.getElementById('floatingPassword').value.trim();
  debugger;
  if (!email.length) {
    console.log('Please enter email');
  } else if (!password.length) {
    console.log('Please enter password');
  } else {
    login(email, password);
  }
}

function login(email, password) {
  let checkEmail = false;
  let checkPassword = false;
  for (let i = 0; i < users.length; i++) {
    if (email == users[i].email) {
      checkEmail = true;
      if (password == users[i].password) {
        checkPassword = true;
        debugger;
        loginAsUser(i);
      }
    }
  }
  if (checkEmail && checkPassword) {
    window.location.href = 'index.html';
  } else if (!checkEmail) {
    console.log('falsche email');
    toastWrongEmail();
  } else if (!checkPassword) {
    console.log('falsches passwort');
    toastWrongPassword();
  }
}

function loginAsUser(i) {
  currentUser.push(i);
  console.log(currentUser);
}

function saveRegristration() {}

function toastWrongEmail() {}

function toastWrongPassword() {}

function highlightAvatar() {
  for (let i = 1; i < 5; i++) {
    let gridRadio = document.getElementById(`gridRadios${i}`);
    if (gridRadio.checked) {
      document.getElementById(`worker${i}`).classList.add('border-danger');
      document.getElementById(`worker${i}`).classList.remove('border-light');
    } else {
      document.getElementById(`worker${i}`).classList.remove('border-danger');
      document.getElementById(`worker${i}`).classList.add('border-light');
    }
  }
}

document.querySelector('#toastBtn').onclick = function () {
  new bootstrap.Toast(document.querySelector('#liveToast')).show();
};
