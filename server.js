'use strict';
const dotenv = require('dotenv');
dotenv.config();
var express = require('express');
var cors = require('cors');
const multer = require('multer');

var app = express();
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
    res.json({ greetings: "Hello, API" });
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    res.json({ name: req.file.originalname, type: req.file.mimetype, size: req.file.size });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
});
