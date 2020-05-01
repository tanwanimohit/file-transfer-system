const express = require('express');
const colors = require('colors');
const fs = require('fs');
const ip = require('ip');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
const upload = multer({
    storage:storage
})

let data = require('./data.json');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.post('/upload', upload.single('myfile'), (req, res) => {
    const code = parseInt(Math.random() * 99999);
    data[code] = req.file.path;
    fs.writeFile('data.json', JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('File Updated!!');
    });
    res.send("File Code :" + code);
})

app.get('/:id',(req,res) => {
    try {
        res.download(__dirname+"/"+data[req.params.id],data[req.params.id]);
    } catch (error) {
        res.send(error);
    }
})

app.listen(3001, console.log(`\n\nServer is running on localhost:3001 \nNetwork : ${ip.address()}:3001 \n\n`.yellow.bold))