 let multer  = require('multer');
 let express = require('express');
 let app     = express();

 var storage = multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, '/uploaded')
     },
     filename: (req, file, cb) => {
         cb(null, file.filename + '-' + Date.now())
     }
 });
 var upload = multer({storage: storage});

 app.post('/api/upload', upload.single('sample'), (req, res) => {
   if (req.file) {
       console.log('Uploading file...');
       var filename = req.file.filename;
       console.log('get file ' + filename);
       res.send({ result: 'success'});
    } else {
        console.log('No File Uploaded');
        res.send({ result: 'fail'});
    }
 });

 app.post('/array', upload.array('sample'), (req, res) => {
   console.log(req.body)
   console.log(req.files);
   res.send();
 });

 app.get('/', (req, res) => {
     res.send("Server is running at 2019 port");
 });

 app.listen(2019);
