var express = require('express');
var router = express.Router();


var ctrlAngular=require('../controllers/angularCtrls');
router.get('/', ctrlAngular.angularApp);
router.get('/about', ctrlAngular.about);

module.exports = router;
