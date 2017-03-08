var Promise = require('bluebird');

module.exports = function(db) {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }

  // Create links table
  return db.queryAsync('CREATE TABLE IF NOT EXISTS links (\
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
    url VARCHAR(255),\
    baseUrl VARCHAR(255),\
    code VARCHAR(5),\
    title VARCHAR(255),\
    visits INT NOT NULL DEFAULT 0,\
    timestamp TIMESTAMP\
    );')
  .then(function() {
    // Create clicks table
    return db.queryAsync('CREATE TABLE IF NOT EXISTS clicks (\
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
      linkId INT,\
      timestamp TIMESTAMP\
      );');
  })
  .then(function() {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS users (\
      id INTEGER NOT NULL AUTO_INCREMENT,\
      username VARCHAR(16) UNIQUE NOT NULL,\
      password VARCHAR(255) DEFAULT NULL,\
      salt VARCHAR(255) DEFAULT NULL,\
      timestamp TIMESTAMP,\
      PRIMARY KEY (id)\
      );');
  })
  .then(function() {
    return db.queryAsync('CREATE TABLE IF NOT EXISTS sessions (\
      id INTEGER NOT NULL AUTO_INCREMENT,\
      hash VARCHAR(255) NOT NULL,\
      user_id INTEGER DEFAULT NULL,\
      timestamp TIMESTAMP,\
      PRIMARY KEY (id)\
      );');
  })


  /************************************************************/
  /*          Add additional schema queries here              */
  /************************************************************/
  // TODO: create table for users with username and passwords column and salt property

  /*
  FOREIGN KEY (user_id) REFERENCES users(id) on delete cascade\

  Create a sessions table to store your generated session hashes and the user ids associated with those sessions.

  */

  .error(function(err) {
    console.log(err);
  });
};


/*


-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(255) NOT NULL DEFAULT 'NULL',
  `salt` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'sessions'
-- 
-- ---

DROP TABLE IF EXISTS `sessions`;
    
CREATE TABLE `sessions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `hash` VARCHAR(255) NOT NULL DEFAULT 'NULL',
  `userId` INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `sessions` ADD FOREIGN KEY (userId) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `sessions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`username`,`password`,`salt`) VALUES
-- ('','','','');
-- INSERT INTO `sessions` (`id`,`hash`,`userId`) VALUES
-- ('','','');













*/