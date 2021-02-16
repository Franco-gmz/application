const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/ramestore';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true   
});

const db = mongoose.connection;

db.once("open", _ => {
    console.log("Database is connected on:", uri);
});
  
db.on("error", err => {
    console.log(err);
});

db.once("connecting", _ => {
    console.log('Connecting mongoDB');
})

module.exports = db;