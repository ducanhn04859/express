var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("db.json"); // luu data tai bd.json
db = low(adapter);
// Set some defaults (required if your JSON file is empty)
module.exports = db;