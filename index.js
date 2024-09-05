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
let posts =[
    {
        id: 1,
        title: "The Rise of Decentralized Finance",
        content:
          "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        author: "Alex Thompson",
        date: new Date(),
      },
      {
        id: 2,
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        content:
          "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
        author: "Mia Williams",
        date: new Date(),
      },
      {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        content:
          "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Samuel Green",
        date: new Date(),
      },
];

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
//edit current post
app.get("/edit/:id", (req,res) => {
    const param = parseInt(req.params.id);
    const postToEdit = posts.find((post) => post.id == param);
    res.render("edit.ejs",{
        id: param,
        title: postToEdit.title,
        content: postToEdit.content,
        author: postToEdit.author
    });

})
//delete a post from array
app.get("/delete/:id", (req,res) => {
    const param = parseInt(req.params.id);
    const postToDelete = posts.findIndex((post)=> post.id == param);
    posts.splice(postToDelete,1);
    res.redirect("/");
})

app.post("/edit/:id", (req, res) => {
    const param =parseInt(req.params.id); // Index of the post to update
    const updatedPostIndex = posts.findIndex((post)=> post.id == param)
    const updatedPost = {
        id: param,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    }
    posts[updatedPostIndex] = updatedPost; // Update the post in the array
    console.log(`Post updated at index ${param}: ${updatedPost}`); // Log for debugging
    res.redirect("/"); // Redirect to the main page to show updated posts
});
app.post("/delete", (req,res) => {
    const index = req.body.index;
    posts.splice(index, 1);
    res.redirect("/");
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
