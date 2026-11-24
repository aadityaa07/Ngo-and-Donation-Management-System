// contact.js - saves the message
var message = document.getElementById('message');

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var text = document.getElementById('messageText').value;

  if (name === '' || email === '' || text === '') {
    message.textContent = 'Please fill in all fields.';
    message.className = 'form-message error';
    return;
  }

  var data = {
    name: name,
    email: email,
    subject: document.getElementById('subject').value,
    message: text,
    date: new Date().toLocaleDateString()
  };
  postData('/messages', data, function () {
    message.textContent = 'Thank you! Your message has been sent.';
    message.className = 'form-message';
    document.getElementById('contactForm').reset();
  });
});
