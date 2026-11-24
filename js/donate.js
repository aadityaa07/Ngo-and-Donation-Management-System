// donate.js - saves a donation
var message = document.getElementById('message');

function showTotals() {
  getData('/donations', function (donations) {
    document.getElementById('liveTotal').textContent = '₹' + sumAmounts(donations);
    document.getElementById('liveCount').textContent = donations.length;
  });
}

// Fill the cause dropdown
getData('/causes', function (causes) {
  var options = '';
  for (var i = 0; i < causes.length; i++) {
    options = options + '<option value="' + causes[i].id + '">' + causes[i].name + '</option>';
  }
  document.getElementById('cause').innerHTML = options;
});

// Quick amount buttons
function setAmount(value) {
  document.getElementById('amount').value = value;
}
document.getElementById('preset500').addEventListener('click', function () { setAmount(500); });
document.getElementById('preset1000').addEventListener('click', function () { setAmount(1000); });
document.getElementById('preset2500').addEventListener('click', function () { setAmount(2500); });

document.getElementById('donateForm').addEventListener('submit', function (event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var amount = Number(document.getElementById('amount').value);

  if (name === '' || email === '' || amount <= 0) {
    message.textContent = 'Please enter your name, email and a valid amount.';
    message.className = 'form-message error';
    return;
  }

  var donation = {
    name: name,
    email: email,
    amount: amount,
    causeId: document.getElementById('cause').value,
    method: document.getElementById('method').value,
    date: new Date().toLocaleDateString()
  };

  postData('/donations', donation, function () {
    message.textContent = 'Thank you, ' + name + '! You donated ₹' + amount + '.';
    message.className = 'form-message';
    document.getElementById('donateForm').reset();
    showTotals();
  });
});

showTotals();
setInterval(showTotals, 5000);
