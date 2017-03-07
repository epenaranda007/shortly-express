var Sessions = require('../models/session');
var util = require('../lib/utility');

var createSession = function(req, res, next) {
};

module.exports = createSession;

/*

In middleware/sessionParser.js, write a middleware function that accesses the parsed cookies on the request, looks up the user data related to that session, and attaches a req.session object on the request that contains relevant user information. (Ask yourself: what information about the user would you want to add?)
Things to keep in mind:
An incoming request with no cookies should generate a unique hash and store it the sessions database. Use the Node crypto module, which is included inside lib/utility.js, to generate a unique hash. For this sprint, use the 'sha1' algorithm to create your hash. The middleware function should use this unique hash to set a cookie in the response headers.
If an incoming request has a cookie, the middleware should verify that the cookie is valid (i.e., it should be received from the same client browser and is an session that is stored in your database). Write a helper function inside 'lib/utility.js' that will verify if the incoming cookie is valid.
If an incoming cookie is not valid, what should you think you should do with that session and cookie? Destroy!


*/