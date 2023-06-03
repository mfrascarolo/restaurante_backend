const { Router } = require("express");
const {loginUsers, registerUsers} = require("../controllers/users");
const { body } = require('express-validator');

const router = Router();

/*  users/  */  
router.post("/", loginUsers);
/*router.post("/", 
[body("email").isEmail(), body("password").isLength({min: 6}),
],registerUsers);*/

module.exports = router;