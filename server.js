const express = require('express');
const mongoose = require('mongoose');
const csv = require('csv-parser')
const fs = require('fs');

const app = express();


// MongoDB Connection
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected ..."))
    .catch(err => console.log(err));

let csvData = []
fs.createReadStream('./Site_Bittenahalli_raw_data.csv')
    .pipe(csv())
    .on('data',(data) => {
        // console.log(data)
        s = JSON.stringify(data)
        csvData.push(data)
    })
    .on('end', () => {
        console.log(csvData[1].Parameter2)
        
        console.log("Csv Processed !!!!!")
    })

console.log(csvData)
app.get("/",(req,res) => {
    d = JSON.stringify(csvData)
    res.send(d)
    console.log(csvData[0].Receive_Time)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server started at port :',PORT));