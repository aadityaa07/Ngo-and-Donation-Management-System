// admin-login.js - login for admins only
var message = document.getElementById('message');

document.getElementById('showPassword').addEventListener('click', function () {
  var box = document.getElementById('password');
  if (box.type === 'password') {
    box.type = 'text';
  } else {
    box.type = 'password';
  }
});

document.getElementById('adminLoginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  if (email === '' || password === '') {
    message.textContent = 'Please enter your email and password.';
    message.className = 'form-message error';
    return;
  }

  getData('/users?email=' + encodeURIComponent(email), function (users) {
    // only accounts with the role 'admin' can log in here
    if (users.length === 0 || users[0].password !== password || users[0].role !== 'admin') {
      message.textContent = 'Access denied. Wrong details or this is not an admin account.';
      message.className = 'form-message error';
      return;
    }
    localStorage.setItem('userName', users[0].name);
    localStorage.setItem('role', 'admin');
    window.location.href = 'admin.html';
  });
});
