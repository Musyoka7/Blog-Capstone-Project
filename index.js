import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
let posts = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs", {Posts: posts});
});
app.post("/submit" ,(req,res) => {
    const NewPost = req.body.Cpost;
    posts.push(NewPost);
    res.redirect("/");
});
app.get("/edit", (req,res) => {
    const index = req.query.index;
    const PostToEdit = posts[index];
    res.render("edit.ejs",{
        post: PostToEdit,
        index: index
    });

})
app.post("/edit", (req, res) => {
    const index = req.body.index; // Index of the post to update
    const updatedPost = req.body.updatedPost; // New content for the post
    posts[index] = updatedPost; // Update the post in the array
    console.log(`Post updated at index ${index}: ${updatedPost}`); // Log for debugging
    res.redirect("/"); // Redirect to the main page to show updated posts
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
