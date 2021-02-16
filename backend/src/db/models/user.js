const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    name:{
        type:String,
        require:true
    },
    surname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    phone:{
        type:String
    },
    points:{
        type:Number,
        default:0
    },
    purchases:{
        type:Number,
        default:0
    },
    created:{
        type:Date,
        default: new Date()
    }
})

module.exports = new model('User', userSchema);