// api.js - LOCAL version. Saves data in the browser (localStorage).
// It has the same 3 functions as the JSON Server version, so later
// we only replace THIS file and every other JS file stays the same.

// Starting data (used the first time the site is opened)
var seedData = {
  causes: [
    { id: 'education',  name: 'Education for Children', description: 'School supplies, books and tuition support.', goal: 100000 },
    { id: 'healthcare', name: 'Healthcare Support',     description: 'Medical camps and essential medicines.',      goal: 150000 },
    { id: 'food',       name: 'Food & Shelter',         description: 'Meals and shelter kits for families.',        goal: 80000 }
  ],
  donations: [
    { id: 1, name: 'Riya Sharma', email: 'riya@example.com',  amount: 5000, causeId: 'education',  method: 'UPI',  date: '10/9/2026' },
    { id: 2, name: 'Aman Verma',  email: 'aman@example.com',  amount: 2500, causeId: 'healthcare', method: 'Card', date: '12/9/2026' },
    { id: 3, name: 'Priya Nair',  email: 'priya@example.com', amount: 4000, causeId: 'food',       method: 'UPI',  date: '14/9/2026' }
  ],
  users: [
    { id: 1, name: 'Admin', email: 'admin@careconnect.org', password: 'admin123', role: 'admin' }
  ],
  messages: []
};

// Read a whole list (like 'donations') from localStorage
function loadTable(name) {
  var saved = localStorage.getItem('cc_' + name);
  if (saved === null) {
    localStorage.setItem('cc_' + name, JSON.stringify(seedData[name]));
    return seedData[name];
  }
  return JSON.parse(saved);   // text -> array
}

// Save a whole list back to localStorage
function saveTable(name, list) {
  localStorage.setItem('cc_' + name, JSON.stringify(list));   // array -> text
}

// GET - read data. Examples: getData('/donations', ...)  getData('/users?email=a@b.com', ...)
function getData(path, callback) {
  var parts = path.split('?');
  var name = parts[0].replace('/', '');
  var list = loadTable(name);

  if (parts.length > 1) {   // there is a filter like email=a@b.com
    var pair = parts[1].split('=');
    var field = pair[0];
    var value = decodeURIComponent(pair[1]);
    var matches = [];
    for (var i = 0; i < list.length; i++) {
      if (String(list[i][field]) === value) {
        matches.push(list[i]);
      }
    }
    list = matches;
  }
  callback(list);
}

// POST - add new data
function postData(path, data, callback) {
  var name = path.replace('/', '');
  var list = loadTable(name);
  data.id = Date.now();   // a simple unique id
  list.push(data);
  saveTable(name, list);
  callback(data);
}

// DELETE - remove data. Example: deleteData('/donations/5', ...)
function deleteData(path, callback) {
  var parts = path.split('/');   // ['', 'donations', '5']
  var name = parts[1];
  var id = parts[2];
  var list = loadTable(name);
  var kept = [];
  for (var i = 0; i < list.length; i++) {
    if (String(list[i].id) !== id) {
      kept.push(list[i]);
    }
  }
  saveTable(name, kept);
  callback();
}

// Add up the amount of every donation in a list
function sumAmounts(list) {
  var total = 0;
  for (var i = 0; i < list.length; i++) {
    total = total + list[i].amount;
  }
  return total;
}
