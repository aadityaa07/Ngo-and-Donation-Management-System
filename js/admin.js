// admin.js - admin dashboard (only for admins)
var isAdmin = (localStorage.getItem('role') === 'admin');

function loadAdmin() {
  getData('/donations', function (donations) {
    document.getElementById('adminTotal').textContent = '₹' + sumAmounts(donations);
    document.getElementById('adminCount').textContent = donations.length;

    var rows = '';
    for (var i = donations.length - 1; i >= 0; i--) {   // newest first
      var d = donations[i];
      rows = rows + '<tr><td>' + d.name + '</td><td>' + d.causeId + '</td><td>₹' + d.amount +
        '</td><td>' + d.method + '</td><td>' + d.date + '</td>' +
        '<td><button class="delete-btn" onclick="removeDonation(\'' + d.id + '\')">Delete</button></td></tr>';
    }
    if (rows === '') {
      rows = '<tr><td colspan="6">No donations yet.</td></tr>';
    }
    document.getElementById('donationRows').innerHTML = rows;
  });
}

function removeDonation(id) {
  if (confirm('Delete this donation?')) {
    deleteData('/donations/' + id, loadAdmin);
  }
}

document.getElementById('logoutButton').addEventListener('click', function () {
  localStorage.removeItem('role');
  localStorage.removeItem('userName');
  window.location.href = 'admin-login.html';
});

// Not an admin? Go to the admin login. Otherwise load the data.
if (isAdmin === false) {
  window.location.href = 'admin-login.html';
} else {
  loadAdmin();
  setInterval(loadAdmin, 5000);
}
