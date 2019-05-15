const   express                 = require("express"),
        mongoose                = require("mongoose"),
        passport                = require("passport"),
        bodyParser              = require("body-parser"),
        flash                   = require("connect-flash"),
        User                    = require("./models/user"),
        Movie                   = require("./models/movie"),
        localStrategy           = require("passport-local"),
        methodOverride          = require("method-override"),
        Comment                 = require("./models/comment"),
        passportLocalMongoose   = require("passport-local-mongoose")
    
//requiring routes
const   indexRoutes             = require("./routes/index"),
        commentRoutes           = require("./routes/comments"),
        moviesRoutes            = require("./routes/movies")
    
mongoose.connect("mongodb://localhost:27017/yelp_movie_v1", {useNewUrlParser: true});
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); 


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "YelpMovie is good",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use( (req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/movies/:id/comments", commentRoutes);
app.use("/movies", moviesRoutes);

app.listen(5555, () => {
    console.log("The YelpMovie Server Has Started at PORT 5555!");
})