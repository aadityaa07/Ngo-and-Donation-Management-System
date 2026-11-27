// login.js - login for donors (users) only
var message = document.getElementById('message');

document.getElementById('showPassword').addEventListener('click', function () {
  var box = document.getElementById('password');
  if (box.type === 'password') {
    box.type = 'text';
  } else {
    box.type = 'password';
  }
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  if (email === '' || password === '') {
    message.textContent = 'Please enter your email and password.';
    message.className = 'form-message error';
    return;
  }

  // look up the user with this email
  getData('/users?email=' + encodeURIComponent(email), function (users) {
    // only accounts with the role 'donor' can log in here
    if (users.length === 0 || users[0].password !== password || users[0].role !== 'donor') {
      message.textContent = 'Wrong email or password. Please try again.';
      message.className = 'form-message error';
      return;
    }
    localStorage.setItem('userName', users[0].name);
    localStorage.setItem('role', 'donor');
    message.textContent = 'Login successful!';
    message.className = 'form-message';
    window.location.href = 'donate.html';
  });
});
