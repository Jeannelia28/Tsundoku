const express = require("express");

const app = express();
const port = 3008;

app.get("/", (req, res)=>{
    res.send("Oops! I did it again, i played with your heart");
})

app.listen(port, ()=>{
    console.log("server running on port", port);
});