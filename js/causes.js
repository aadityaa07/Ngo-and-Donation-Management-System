// causes.js - builds the cause cards from the saved data
function loadCauses() {
  getData('/causes', function (causes) {
    getData('/donations', function (donations) {
      var html = '';
      for (var i = 0; i < causes.length; i++) {
        var c = causes[i];

        // add up the donations that belong to this cause
        var raised = 0;
        for (var j = 0; j < donations.length; j++) {
          if (donations[j].causeId === c.id) {
            raised = raised + donations[j].amount;
          }
        }

        var percent = Math.round((raised / c.goal) * 100);
        if (percent > 100) {
          percent = 100;
        }

        html = html + '<article class="card">' +
          '<h3>' + c.name + '</h3><p>' + c.description + '</p>' +
          '<div class="progress-bar"><div class="progress-fill" style="width:' + percent + '%"></div></div>' +
          '<p class="progress-text"><strong>₹' + raised + '</strong> raised of ₹' + c.goal + ' (' + percent + '%)</p>' +
          '<a class="btn btn-primary" href="donate.html">Donate</a></article>';
      }
      document.getElementById('causeList').innerHTML = html;
    });
  });
}
loadCauses();
setInterval(loadCauses, 5000);
