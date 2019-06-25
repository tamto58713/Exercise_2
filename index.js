const express = require('express');
const app = express();
var port = process.env.PORT || 8080
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var md5 = require('md5');
const customerRoute = require("./router/customer.route");
const authRoute = require("./router/auth.route")

const db = require("./db")

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('view engine', 'pug')
app.set('views', './views')
app.locals.currentUser = {name: ""}
app.get('/', (req, res, next) => {
    res.render("");
    next();
})
app.get('/about', (req, res) => { 
    var user = require("./controller/auth.controller")
    var currentUser = user.currentUser;
    
    res.render("about", {currentUser: currentUser})
})

app.use('/customers', customerRoute);
app.use('/auth', authRoute)
app.get('/favicon.ico', (req, res, next) => {res.status(204); next()});
app.listen(port, () => {
    console.log("App listening on port " + port);
})
