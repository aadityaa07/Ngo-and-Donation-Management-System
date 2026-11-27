// home.js - live totals on the home page
function loadTotals() {
  getData('/donations', function (donations) {
    document.getElementById('totalRaised').textContent = '₹' + sumAmounts(donations);
    document.getElementById('donationCount').textContent = donations.length;
  });
}
loadTotals();
setInterval(loadTotals, 5000);   // check again every 5 seconds = "live"
