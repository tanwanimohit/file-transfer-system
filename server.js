const express = require('express');
const colors = require('colors');
const fs = require('fs');
const ip = require('ip');
const multer = require('multer');
const upload = multer({
    "dest": "uploads/"
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
    res.send("Uploaded Successfully, Code to Acess file is : " + code);
})

app.get('/:id',(req,res) => {
    try {
        res.sendFile(__dirname+"/"+data[req.params.id]);
    } catch (error) {
        res.send(error);
    }
})

app.listen(3001, console.log(`\n\nServer is running on localhost:3001 \nNetwork : ${ip.address()}:3001 \n\n`.yellow.bold))