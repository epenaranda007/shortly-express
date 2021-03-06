var db = require('../db');
var util = require('../lib/utility');

// Write you session database model methods here
var checkIfSessionExists = function(hash, cb) {
  var queryString = 'SELECT user_id FROM sessions WHERE sessions.hash = ?';
  db.query(queryString, [hash], function (err, rows) {
    if (rows.length > 0) {
      // console.log(rows[0]);
      cb(true, rows[0].user_id);
    } else {
      cb(false);
    }
  });
};

var checkAllCookies = function(cookies, cb) {
  for (var key in cookies) {
    checkIfSessionExists(cookies[key], function (bool, userId) {
      if (bool) {
        return cb(true, userId, cookies[key]);
      } else {
        return cb(false);
      }
    });
  }
};

var createSession = function(session) { //session?
  var queryString = 'INSERT INTO sessions SET ?';
  db.query(queryString, {hash: session.hash, 'user_id': 1}, function(err, result) {

  });
};
var deleteSession = function(session) {
  var queryString = 'DELETE FROM sessions WHERE sessions.hash = ?';
  db.queryAsync(queryString, [session.hash]);
};
  //TODO
  //add userId in the query

module.exports = {
  checkIfSessionExists: checkIfSessionExists,
  checkAllCookies: checkAllCookies,
  createSession: createSession,
  deleteSession: deleteSession
};
