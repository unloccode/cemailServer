let express = require('express');
let router = express.Router();

//require controllers
const users = require('../controller/controller.js');


router.post('/api/user', users.createUser);
router.get('/api/users', users.allUsers);


module.exports = router;