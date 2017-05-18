var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
  console.log(req.body);
  res.send('ok');
});

module.exports = router;
