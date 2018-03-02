var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
    //
    {
        usernameField: "username"
    },
    function(username, password, done) {
        //This is the log in function run during an attempt
        db.User.findOne({
            where: {
                username: username
            }
        }).then(function(dbUser) {
            //This checks for the username
            if (!dbUser) {
                return done(null, false, {
                    message: "No user found. Please try again."
                });
            }
            //This throws and incorrect password message when the username has been verified
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect Password. Please try again."
                });
            }
            //If it could verify both, it returns the user
            return done(null, dbUser);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
  // Exporting our configured passport
  module.exports = passport;
  
    