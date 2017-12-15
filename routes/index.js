var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
var fs = require('fs');

const dir = path.join(__dirname,'/testfiles');

router.get('/',function (req,res) {
    res.send('welcome to the future');
})
router.post('/check',function (req,res) {
    if(req.body.verificationToken){
        res.send(req.body.verificationToken)
    }else {
        console.log('name file',req.files.file.name);

        fs.writeFile(path.join(__dirname,'/testfiles') + req.files.file.name, req.files.file.data, function (err) {
            if (err) {
                console.log('error occuread while writing file')
            } else {
                console.log('file written successfully')
                // download(req,res)
                res.send('done');

            }
        });
    }
})

router.get('/list',function (req,res) {
    fs.readdir(dir, (err, files) => {
        if(err){
            console.log('errr ',err)
            res.render('list',{files:['null']});
        }else{
            console.log('files ',files)
            res.render('list',{files:files});
        }
});
});

function download(req,res) {
    console.log('name file',req.files.file.name);

    fs.readFile('/home/deepak/scratch projects/routes/testfiles/'+req.files.file.name+'/.pdf', function (err, data) {
        if (data)
            res.send(data);
        else console.log('error occurred while reading file');
    });
}

router.get('/download/:id',function (req,res) {
        // let file  = new Buffer()
    console.log(req.params.id);

    fs.readFile('/home/deepak/scratch projects/routes/testfiles/'+req.params.id+'/.pdf', function (err, data) {
        if (data)
        res.send(data);
        else console.log('error occurred while reading file');
    });

})
module.exports = router;
