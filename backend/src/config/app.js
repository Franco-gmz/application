const express = require('express');
const cors = require('cors');
const usersRouter = require('../routes/users/routes');

//Initialization

const app = express();

//Settings 

app.set('port',process.env.PORT || 3000);


//Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes

app.use('/api/users',usersRouter);


//Starting server

app.listen(app.get('port'), () => { console.log('Server is listening on port ', app.get('port'))});

module.exports = app;