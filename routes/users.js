var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/files', function(req, res, next) {

    
    if(req.body.verificationToken){
        res.send(req.body.verificationToken)
    }else {
        var fs = require('fs');
        fs.writeFile(path.join(__dirname,'/testfiles/' + req.files.file.name, req.files.file.data), function (err) {
            if (err) {
                console.log('error occured while writing file')
            } else {
                console.log('file written successfully')
                res.download(path.join(__dirname,'/testfiles/' + req.files.file.name));
                res.send('done');
            }
        });
    }
});

module.exports = router;
