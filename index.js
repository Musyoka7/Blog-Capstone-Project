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
    let EditPost = parseInt(req.body.Epost);
    serac

})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
