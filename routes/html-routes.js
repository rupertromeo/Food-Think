// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

var auth = require("../config/middleware/auth");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });
  
  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/cms");
    }
    res.sendFile(path.join(__dirname, "../public/input.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/cms");
    }
    res.sendFile(path.join(__dirname, "../public/existuser.html"));
  });

  // Here we've add our auth middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/cms", auth, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

};
