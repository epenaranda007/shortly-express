var Sessions = require('../models/session');
var util = require('../lib/utility');
var Users = require('../models/user');

var createSession = function(req, res, next) {
  var sessionObj = {};  
  var agent = req.get('User-Agent') || (Math.random() * 1000).toString();
  
  if (Object.keys(req.cookies).length === 0) {
    sessionObj.hash = util.createHash(agent + '');
    req.session = sessionObj;
    res.cookies = {shortlyid: {value: sessionObj.hash}};
    Sessions.createSession(req.session);
    next();
    //TODO-- pass userID?
  } else {
    
    Sessions.checkAllCookies(req.cookies, function(bool, userId, hash) {
      if (bool) {
        // sessionObj.hash = hash;
        //compare hash? 
        if (!util.compareHash(agent, hash)) {
          console.log('req.session', req.session);
          Sessions.deleteSession(req.session);
          res.clearCookie('shortlyid');
        } else {
          req.session = {hash: hash};          
        }
      } else {
        res.clearCookie('shortlyid');
      }

      next();
    });
  }
};
module.exports = createSession;






















 /*
  INIT:
    //check the cookie if empty
    // create a cookie/hash
    // create a session object with hash,userid,username properties

  */

/*

In middleware/sessionParser.js, write a middleware function that accesses the parsed cookies on the request, looks up the user data related to that session, and attaches a req.session object on the request that contains relevant user information. (Ask yourself: what information about the user would you want to add?)
Things to keep in mind:
An incoming request with no cookies should generate a unique hash and store it the sessions database. Use the Node crypto module, which is included inside lib/utility.js, to generate a unique hash. For this sprint, use the 'sha1' algorithm to create your hash. The middleware function should use this unique hash to set a cookie in the response headers.
If an incoming request has a cookie, the middleware should verify that the cookie is valid (i.e., it should be received from the same client browser and is an session that is stored in your database). Write a helper function inside 'lib/utility.js' that will verify if the incoming cookie is valid.
If an incoming cookie is not valid, what should you think you should do with that session and cookie? Destroy!


*/


/*

var Sessions = require('../models/session');
var util = require('../lib/utility');
var Users = require('../models/user');

var createSession = function(req, res, next) {
  var sessionObj = {};  
  if (Object.keys(req.cookies).length === 0) {
    sessionObj.hash = util.createHash((Math.random() * 1000).toString());
    req.session = sessionObj;
    res.cookies = {shortlyid: {value: sessionObj.hash}};
    Sessions.createSession(req.session);
    next();
    //TODO-- pass userID?
  } else {
    
    Sessions.checkAllCookies(req.cookies, function(bool, userId, hash) {
      if (bool) {
        // Users.getUserNameFromID(userId, function(bool1, username) { 
          // if (bool1) {
            // sessionObj['user_id'] = userId;
            //sessionObj.username = username;
            // sessionObj.hash = hash;
        sessionObj.hash = hash;
            // req.session = sessionObj; 
            // req.session = {hash: hash};
        req.session = {hash: hash};
            // next();
          // }
        // });
      } else {
        res.clearCookie('shortlyid');
      }
      next();
    });
  //verify if cookie exists in sessions table
    //if yes, add it to the session object
    //and attach req.session object to the request
      //req.session object should contain user_id and username
    //if no, generate hash, and store it to the db in sessions table
      //use node crypto module included in lib/utility
    //if incoming cookie is not valid, 
      //destroy!!!! "banned!"
  }
  // next();
};

*/