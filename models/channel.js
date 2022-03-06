const mongoose = require("mongoose")

const channelSchema = new mongoose.Schema({
    email:{
        type:String
    },
    schoolName: {
        type:String
    },
    instagram:{
        type:String
    },
    musicArtist:{
        type:String
    },
    occupation: {
        type:String
    },
    tnbCharts:{
        type:String
    },
    spotifyUrl: {
        type:String
    },
    soundcloudUrl:{
        type:String
    },
    name: {
        type:String
    },
});

const ChannelModel = mongoose.model('Channel', channelSchema)

module.exports = ChannelModel