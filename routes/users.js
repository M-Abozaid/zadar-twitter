var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/sample', function(req, res, next) {

  userService.getUsers().then(users=>{
    res.status(200)
    res.json(users);

  })

});

module.exports = router;
