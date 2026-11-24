// api.js - 3 helper functions that talk to the JSON Server. Load this FIRST.
var API = 'http://localhost:3000';
var errorShown = false;

function showError() {
  if (errorShown === false) {
    errorShown = true;
    alert('Something went wrong. Is the server running? (run: npm start)');
  }
}

// GET - read data. callback receives the data.
function getData(path, callback) {
  fetch(API + path)
    .then(function (response) { return response.json(); })
    .then(callback)
    .catch(showError);
}

// POST - add new data
function postData(path, data, callback) {
  fetch(API + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(function (response) { return response.json(); })
    .then(callback)
    .catch(showError);
}

// DELETE - remove data
function deleteData(path, callback) {
  fetch(API + path, { method: 'DELETE' })
    .then(callback)
    .catch(showError);
}

// Add up the amount of every donation in a list
function sumAmounts(list) {
  var total = 0;
  for (var i = 0; i < list.length; i++) {
    total = total + list[i].amount;
  }
  return total;
}
