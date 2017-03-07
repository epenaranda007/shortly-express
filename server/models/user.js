var db = require('../db');
var utils = require('../lib/utility');
var crypto = require('crypto');

// Write you user database model methods here
var checkIfUserExist = function(username, cb) {
  var queryString = 'SELECT * FROM users WHERE users.username = ?';
  db.query(queryString, [username], function (err, rows) {
    if (rows.length > 0) {
      cb(true);
    } else {
      cb(false);
    }
  });
};

var addUser = function(user) {
  var username = user.username;
  console.log('I am adding ' + user);
  var sha = crypto.createHash('sha1');
  sha.update(user.password);
  var password = sha.digest('hex');
  var queryString = 'INSERT INTO users SET ?'; 
  return db.queryAsync(queryString, {username: username, password: password});
};

module.exports = {
  addUser: addUser,
  checkIfUserExist: checkIfUserExist
};



