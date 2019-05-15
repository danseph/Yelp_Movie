const   express = require("express"), 
        router  = express.Router(),
        Movie = require("../models/movie"),
        middleware = require("../middleware")

//INDEX - show all mlvies
router.get("/", (req, res) => {
    // Get all movies from DB
    Movie.find({}, (err, allMovies) => {
       if(err){
           console.log(err);
       } else {
          res.render("movies/index",{movies:allMovies});
       }
    });
});

//CREATE - add new movie to DB
router.post("/", middleware.isLoggedIn, (req, res) => {
    // get data from form and add to movies array
        let name = req.body.name;
        let release = req.body.release;
        let image = req.body.image;
        let desc = req.body.description;
        let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newMovie = {name: name, release:release, image: image, description: desc, author: author}
    // Create a new movie and save to DB
    Movie.create(newMovie, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else {
            //redirect back to movies page
            console.log(newlyCreated)
            res.redirect("/movies");
        }
    });
});

//NEW - show form to create new movie
router.get("/new", middleware.isLoggedIn, (req, res) => {
   res.render("movies/new"); 
});

// SHOW - shows more info about one movie
router.get("/:id", (req, res) => {
    //find the movie with provided ID
    Movie.findById(req.params.id).populate("comments").exec((err, foundMovie) => {
        if(err){
            console.log(err);
        } else {
            console.log(foundMovie);
            //render show template with that movie
            res.render("movies/show", {movie: foundMovie});
        }
    });
});

//EDIT MOVIE ROUTE
router.get("/:id/edit", middleware.checkMovieOwnership, (req, res) => {
        Movie.findById(req.params.id, (err, foundMovie) => {
            res.render("movies/edit", {movie: foundMovie});
        });
});

//UPDATE MOVIE ROUTE
router.put("/:id", middleware.checkMovieOwnership, (req, res) => {
    //find an update the correct movie
    Movie.findByIdAndUpdate(req.params.id, req.body.movie, (err, updatedMovie) => {
        if(err){
            res.redirect("/movies");
        } else {
            res.redirect("/movies/" + req.params.id);
        }
    });
    //redirect somewhere(show page)
});

//DESTROY MOVIE ROUTE
router.delete("/:id", middleware.checkMovieOwnership, (req, res) => {
    Movie.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/movies");
        } else {
            res.redirect("/movies");
        }
    });
});




module.exports = router;

