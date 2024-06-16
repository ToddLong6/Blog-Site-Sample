import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];
const count = posts.length;


// Home
app.get("/", (req, res) => {
    const count = posts.length;
    const data = {
        posts: posts,
        count: count
    };
    res.render("index.ejs", data);
});

// Create a post
app.get("/add", (req, res) => {
    res.render("add.ejs");
});

// add the post
app.post("/create", (req, res) => {
    createPost(req.body["blogTitle"], req.body["blogPost"]);
    res.redirect("/");
});

//show Blog Post
app.get("/post/:id", (req, res) => {
    const id = req.params.id;
    const count = posts.length;
    const data = {
        title: posts[id],
        posts: posts,
        count: count
    };
    res.render("post.ejs", data);
});

// Edit the post
app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    editPost(id, req.body["blogTitle"], req.body["blogPost"])
    res.redirect("/");
});

// Delete the post
app.post("/delete/:id", (req, res) => {
    const id = req.params.id;
    deletePost(id)
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



// add title: post to the posts array
function createPost(title, post){
    posts.push({
        key: title,
        value: post,
    })
    
}

// delete the post form the posts array
function deletePost(index){
    posts.splice(index, 1)
    // console.log(posts + "deleted")
}

// edit the post the in the array
function editPost(index, title, post){
    // console.log(posts[index])
    for (let object of posts) {
        if (object === posts[index]) {
            object.key = title;
            object.value = post;
        }
    }
}