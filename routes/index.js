const   express = require("express"),
        router  = express.Router(),
        passport = require("passport"),
        User = require("../models/user")

//root route
router.get("/", (req, res) => {
    res.render("landing");
});

// show register form
router.get("/register", (req, res) => {
   res.render("register"); 
});

//handle sign up logic
router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
           req.flash("success", "Welcome to YelpMovie, " + user.username)
           res.redirect("/movies"); 
        });
    });
});

//show login form
router.get("/login", (req, res) => {
   res.render("login"); 
   
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/movies",
        failureRedirect: "/login"
    }), (req, res) => {
});

// logout route
router.get("/logout", (req, res) => {
   req.logout();
   req.flash("success", "Logged you out!")
   res.redirect("/movies");
});


module.exports = router;