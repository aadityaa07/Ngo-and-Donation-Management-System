// Creates your own db.json from db.seed.json (first run, or: npm run reset)
var fs = require('fs');
if (process.argv[2] === 'reset' || !fs.existsSync('db.json')) {
  fs.copyFileSync('db.seed.json', 'db.json');
  console.log('db.json created from db.seed.json');
}
