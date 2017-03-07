var parseCookies = function(req, res, next) {
  var cookieObj = {};
  if (req.headers.cookie) {
    var cookiesArray = req.headers.cookie.split(';');
    cookiesArray.forEach(function(cookie) {
      var temp = cookie.split('=');
      cookieObj[temp[0].trim()] = temp[1];
    });
  }

  req.cookies = cookieObj;
  next();
};

module.exports = parseCookies;
