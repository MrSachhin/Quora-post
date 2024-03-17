const express = require("express");
const app = express();
const port = 8080;
const path= require("path");


app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
       
        username: "sachinkumar",
        content: "This is an media post web service",
    },
    {
        
        username: "chotu",
        content: "Dream is to be an indian army officer",
    },
    {
       
        username: "jharlu",
        content: "No matter who is jharlu",
    }
]
app.get("/posts", (req, res)=>{
    res.render("home.ejs",  { posts });
});

app.get("/posts/post", (req, res) =>{
    res.render("post.ejs", {posts});
});

app.post("/posts", (req, res) =>{
    
    let {username, content} = req.body;
    posts.push( { username, content});
    res.redirect("/posts");
});
app.post("/posts/:id", (req, res) =>{
    let {id}=req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});


app.patch("/posts/:id", (req, res) =>{
    let {id}=req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
});

app.delete("/posts/:id", (req, res) => {
    let {id}=req.params;
    posts = posts.filter((p) => id !== p.id);
    res.send("deleted successfully");

});

app.listen(port, ()=>{
    console.log("server is running on: 8080");
});