var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var email = req.body.email;
    var sname = req.body.sname;
    var instagram= req.body.instagram;
    var musicartist = req.body.musicartist;
    var whar= req.body.whar;
    var charts= req.body.charts;
    var spoturl = req.body.spoturl;
    var soundurl= req.body.soundurl;

    var data = {
        "email": email,
        "schoolName": sname,
        "instagram": instagram,
        "musicartist":musicartist,
        "occupation": whar,
        "tnbCharts":charts,
        "spotifyUrl": spoturl,
        "soundcloudUrl":soundurl
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");