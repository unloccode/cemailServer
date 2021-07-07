const express = require('express');
var bodyParser = require('body-parser');
const db = require('./config/db.config.js');
let router = require('./router/router.js');
const cors = require('cors');

//global
global.__basedir = __dirname;

const app = express();
const User = db.User;

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

//create server
const server = app.listen(8080, function(){
    let host = server.address().address
    let port = server.address().port
});

//write data to db, defaults
db.sequelize.sync({force:true}).then(()=>{
    console.log('Drop and Resync with {force: true}');
    User.sync().then(()=>{
        const users = [
            {
                email: 'georgelimour@gmail.com',
                confirmed: false
            }
        ]
        for(let i=0; i<users.length; i++){
            User.create(users[i]);
        }
    })
});