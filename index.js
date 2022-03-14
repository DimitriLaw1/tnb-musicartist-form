var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const ChannelModel = require("./models/channel")

const dbUrl = "mongodb+srv://dalaw:dalaw2614@cluster0.i4kh1.mongodb.net/tnbDatabase?retryWrites=true&w=majority"
//const PORT = 3000; 

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect(dbUrl, connectionParams).then(()=>{
    console.info("connected to DB");
})
.catch((e) =>{
    console.log("Error:", e);
});

var db = mongoose.connection; 

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var email = req.body.email;
    var instagram= req.body.instagram;
    var selectSchool = req.body.selectSchool;
    var addNewSchool = req.body.addNewSchool;
    var whatAreYou = req.body.whatAreYou;
    var contestEnroll= req.body.contestEnroll;
    var spoturl = req.body.spoturl;
    var soundurl= req.body.soundurl;
    var brandUrl= req.body.brandUrl;

    var data = {
        "email": email,
        "instagram": instagram,
        "schoolName": selectSchool,
        "addSchoolName": addNewSchool,
        "occupation":whatAreYou,
        "contestEnrollment": contestEnroll,
        "spotifyUrl": spoturl,
        "soundcloudUrl":soundurl,
        "brandUrl":brandUrl,
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

}) 

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
})

app.listen(port, function() {
    console.log("Server started succesfully");
  });  



console.log("Listening on PORT 3000");

/*
app.listen(PORT, ()=>{
console.log(`Listening on PORT: ${PORT}`);
}); */
/*
app.get("/insert",(req,res)=>{
   var channelModel = new ChannelModel()
   channelModel.email = "dalaw@aggies.ncat.edu"
   channelModel.schoolName = "ncat"
   channelModel.instagram = "director_meech"
   channelModel.musicArtist = "NO"
   channelModel.occupation = "Videographer"
   channelModel.tnbCharts = "YES"
   channelModel.spotifyUrl = "dalaw"
   channelModel.soundcloudUrl = "soundcloud.com/dalaw"

   channelModel.save((err,data)=>{
       if(err){
console.error(err)
       }else{
           res.status(200).send({"msg": "Inserted to DB"})
       }
   })
})

*/