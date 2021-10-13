const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const User = require("./models/User");
const mongoose = require("mongoose")
const cors = require("cors")
const PORT = process.env.PORT || 5000
const ip = "127.0.0.1";


const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())


// mongoose
mongoose.connect("mongodb://localhost:27017/tenDB", {useNewUrlParser: true, useUnifiedTopology: true})


//home route
app.get ('/', (req, res)=>{
  const user = {
        date: "2020",
        suburb : "Burwood",
  }
  res.send(user)
})

//register route
app.post('/register', (req,res)=>{
  
  const user = new User({
    task:req.body.task,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    suburb: req.body.suburb,
    budget: req.body.budget,
    estimate: req.body.estimate,

    });
    user.save()
    .catch((err) => console.log(err));
    res.json(('saved to db: ' + user));
    
})





app.listen(5000, (req,res)=>{
  console.log(`server is running at http://${ip}:${PORT}`);
  
})
