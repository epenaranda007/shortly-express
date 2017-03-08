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
  var sha = crypto.createHash('sha1');
  sha.update(user.password);
  var password = sha.digest('hex');
  var queryString = 'INSERT INTO users SET ?'; 
  return db.queryAsync(queryString, {username: username, password: password});
};

var checkPassword = function(password, cb) {
  var sha = crypto.createHash('sha1');
  sha.update(password);
  var hash = sha.digest('hex');
  var queryString = 'SELECT password FROM users WHERE users.password = ?';
  db.query(queryString, [hash], function(err, rows) {
    if (rows.length > 0) {
      cb(true);
    } else {
      cb(false);
    }
  });
};

var getUserNameFromID = function(userId, cb) {
  var queryString = 'SELECT username FROM users WHERE users.id = ?';
  db.query(queryString, [userId], function(err, rows) {
    if (rows.length > 0) {
      console.log(rows[0]);
      cb(true, rows[0].username);
    } else {
      cb(false);
    }
  });
};

var getUserIdFromName = function(username, cb) {
  var queryString = 'SELECT id FROM users WHERE users.username = ?';
  db.query(queryString, [username], function(err, rows) {
    if (rows.length > 0) {
      console.log(rows[0]);
      cb(true, rows[0].id);
    } else {
      cb(false);
    }
  });
};


module.exports = {
  addUser: addUser,
  checkIfUserExist: checkIfUserExist,
  checkPassword: checkPassword,
  getUserNameFromID: getUserNameFromID
};



