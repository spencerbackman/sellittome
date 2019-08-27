const express = require('express');
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 5800;
const cors = require('cors');
const bodyParser = require('body-parser');
let nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());
app.use(morgan('dev'));

app.use('/send', require('./routes/email'));
app.use('/cars', require('./routes/cars'));
app.use('/vins', require('./routes/vins'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/sellittome', { useNewUrlParser: true }, (err) => {
    if (err) console.log(err);
    console.log('connected to the database')
})

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
