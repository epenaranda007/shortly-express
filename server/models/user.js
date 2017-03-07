var db = require('../db');
var utils = require('../lib/utility');
var crypto = require('crypto');

// Write you user database model methods here
var addUser = function(user) {
  console.log('adding ' + user );
  var username = user.username;
  var sha = crypto.createHash('sha1');
  sha.update(user.password);
  var password = sha.digest('hex');

  var queryString = 'INSERT INTO users SET ?'; 
  console.log('user created', password);
  return db.queryAsync(queryString, {username: username, password: password});
};

module.exports = {
  //check user
  //add user
  addUser: addUser
};

/////



/*
var addOne = function(link) {
  var queryString = 'INSERT INTO links SET ?';

  var shasum = crypto.createHash('sha1');
  shasum.update(link.url);
  link.code = shasum.digest('hex').slice(0, 5);

  return db.queryAsync(queryString, link);
};

var addClick = function(linkId) {
  var queryString = 'INSERT INTO clicks SET ?';
  return db.queryAsync(queryString, { linkId: linkId }).return(linkId);
};

module.exports = {
  addClick: addClick
};
*/