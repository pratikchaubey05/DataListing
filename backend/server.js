import express from "express";
import axios from "axios";

const app = express();

app.get("/", (req, res)=>{
    res.send("API is running");
});

// DESC: Getting all the data
app.get("/api/data", async (req, res)=>{
    try {
        const apiRes = await axios.get("https://jsonplaceholder.typicode.com/posts")
        res.json(apiRes.data);
    } catch (error) {
        res.send(error);
    }

});

// DESC: Getting a single Data by id
app.get("/api/data/:id", async (req, res)=>{
    try {
        const apiRes = await axios.get(`https://jsonplaceholder.typicode.com/posts/${req.params.id}`);
        res.json(apiRes.data);
    } catch (error) {
        res.send(error);
    }

});



const PORT = 5000 ;
app.listen(PORT, console.log(`Server is running on port: ${PORT}`)) ;