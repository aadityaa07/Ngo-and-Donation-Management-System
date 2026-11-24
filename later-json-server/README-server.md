# Switching to JSON Server (do this later)

1. Install Node.js from nodejs.org.
2. Move `package.json`, `setup.js`, `db.seed.json` and `.gitignore` from this folder into the project root.
3. Replace `js/api.js` with `later-json-server/api.server.js` (copy it over and keep the name `api.js`).
4. In the project root run:  `npm install`  then  `npm start`  (keep that terminal open).
5. Open `index.html`. No other JS file needs to change.

Server address: http://localhost:3000   Fresh data: `npm run reset`
Each computer runs its own server, so donations are not shared between laptops.
