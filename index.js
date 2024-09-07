import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;
const db = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "blog",
  password: "Shaggypet2015",
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req,res) => {
    
    try {
        const result = await db.query("SELECT * FROM posts ORDER BY date DESC")
        res.render("index.ejs", {Posts: result.rows});
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving posts");
        
    }
    
});
//create new post
app.get("/new" ,(req,res) => { 
    res.render("new.ejs", {
        heading: "New Post"
    })
});
app.post("/post", async (req,res) => {
    const {title, content, author } = req.body
    console.log(req.body);
    try {
        await db.query("INSERT INTO posts(title, content, author) VALUES($1, $2, $3)", 
            [title, content, author]
        )
        res.redirect("/");
    } catch (error) {
        console.error(error, );
        res.status(500).send("Error Adding new post");
    }
})
//edit a blog post
app.get("/edit/:id", async (req,res) => {
    const param = parseInt(req.params.id);
    try {
        const result = await db.query("SELECT * FROM  posts WHERE id = $1", [param])
        const post = result.rows[0];
        res.render("edit.ejs", {
            id: post.id,
            title: post.title,
            content: post.content,
            author: post.author
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error editing post");
    }
})
//POST EDITED POST
app.post("/edit/:id", (req, res) => {
    const param = parseInt(req.params.id); // Index of the post to update
    const { title, content, author} = req.body;
    try {
        const result = db.query("UPDATE posts SET title = $1, content = $2, author = $3, date = NOW() WHERE id = $4", [title, content,author,param])
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating posts")
    }
});

//delete a post from array
app.get("/delete/:id", async (req,res) => {
    const param = parseInt(req.params.id);
    try {
        const result = db.query("DELETE FROM posts WHERE id = $1", [param])
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to delete post");
    }
})
//RUN SERVER
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
