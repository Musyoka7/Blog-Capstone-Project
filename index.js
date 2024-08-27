import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
let posts =[
    {
        id: 1,
        title: "The Rise of Decentralized Finance",
        content:
          "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        author: "Alex Thompson",
        date: "2023-08-01T10:00:00Z",
      },
      {
        id: 2,
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        content:
          "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
        author: "Mia Williams",
        date: "2023-08-05T14:30:00Z",
      },
      {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        content:
          "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Samuel Green",
        date: "2023-08-10T09:15:00Z",
      },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
app.get("/delete", (req,res) => {
    const index = req.query.index
    const PostToDelete = posts[index];
    res.render("delete.ejs", {
        post: PostToDelete,
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
app.post("/delete", (req,res) => {
    const index = req.body.index;
    posts.splice(index, 1);
    res.redirect("/");
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
