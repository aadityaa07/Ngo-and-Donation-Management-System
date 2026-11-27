// register.js - creates a new user
var message = document.getElementById('message');

function showMessage(text, isError) {
  message.textContent = text;
  if (isError) {
    message.className = 'form-message error';
  } else {
    message.className = 'form-message';
  }
}

document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  if (name === '' || email === '' || password === '') {
    showMessage('Please fill in all fields.', true);
    return;
  }
  if (password.length < 6) {
    showMessage('Password must be at least 6 characters.', true);
    return;
  }
  if (password !== confirmPassword) {
    showMessage('Passwords do not match.', true);
    return;
  }

  // make sure this email is not already used
  getData('/users?email=' + encodeURIComponent(email), function (existing) {
    if (existing.length > 0) {
      showMessage('This email is already registered.', true);
      return;
    }
    var user = { name: name, email: email, password: password, role: 'donor' };
    postData('/users', user, function () {
      showMessage('Account created! Taking you to the login page...', false);
      setTimeout(function () {
        window.location.href = 'login.html';
      }, 1200);
    });
  });
});
