const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

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
    password:{
        type:String,
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
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
};

userSchema.methods.matchPassword = async function (password){
    match = await bcrypt.compare(password,this.password); //me sirve function porque hago referencia al objeto donde se define
    return match;
};

module.exports = new model('User', userSchema);