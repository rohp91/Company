const express = require("express");

const app =require();
const port =process.env.PORT || 3000;

app.get("/", async(req,res)=>{
    res.send("Hello from the hero")
})
app.listen(port,()=>{
    console,log(`connection is live at port no. ${port}`);
})