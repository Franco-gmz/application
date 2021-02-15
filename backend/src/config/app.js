const express = require('express');
const cors = require('cors');
const router = require('./routes');

//Initialization

const app = express();

//Settings 

app.set('port',process.env.PORT || 3000);


//Middlewares

app.use(cors());

//Routes

app.use('api/',router)

//Starting server

app.listen(app.get('port'), () => { console.log('Server is listening on port ', app.get('port'))});

module.exports = app;