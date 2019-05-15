const   express = require("express"),
        router  = express.Router({mergeParams: true}),
        Movie = require("../models/movie"),
        Comment = require("../models/comment"),
        middleware = require("../middleware")

//Comments New
router.get("/new", middleware.isLoggedIn, (req, res) => {
    // find movie by id
    Movie.findById(req.params.id, (err, movie) => {
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {movie: movie});
        }
    })
});

//Comments Create
router.post("/", middleware.isLoggedIn,(req, res) => {
   //lookup movie using ID
   Movie.findById(req.params.id, (err, movie) => {
       if(err){
           req.flash("err", "Something went wrong");
           console.log(err);
           res.redirect("/movies");
       } else {
        Comment.create(req.body.comment, (err, comment) => {
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               movie.comments.push(comment);
               movie.save();
               req.flash("success", "Successfully added comment")
               res.redirect('/movies/' + movie._id);
           }
        });
       }
   });
});

//COMMENT EDIT 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        res.render("comments/edit", {movie_id: req.params.id, comment: foundComment});
    });
});


//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment ,(err, updatedComment) => {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/movies/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/movies/" + req.params.id)
        }
    });
});


module.exports = router;