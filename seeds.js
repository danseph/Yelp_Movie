const mongoose = require("mongoose");
const Movie = require("./models/movie");
const Comment = require("./models/comment");

const data = [
    {
        name: "Toronto, Canada", 
        image: "https://images.unsplash.com/photo-1538287816585-a55721195734?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
    },
    {
        name: "man using umbrella crossing the street during daytime", 
        image: "https://images.unsplash.com/photo-1488034976201-ffbaa99cbf5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  "
    },
    {
        name: "cityscape by water", 
        image: "https://images.unsplash.com/photo-1517933029403-91a9781f7d77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  "
    }
    ]

function seedDB(){
    //Remove all movies
    Movie.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log("removed movies!");
        //add a few movies
        data.forEach(function(seed){
            Movie.create(seed, function(err, seedMovie){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a movie")
                    //add a few comments
                    Comment.create(
                        {
                            text: "This place is great , but I wish there was intenet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                seedMovie.comments.push(comment);
                                seedMovie.save();
                                console.log("Created new comment")
                            }
                        })
                }
            })
        })
    });
}

module.exports = seedDB;
