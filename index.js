const express = require('express');
const app = express();
const port = 8080;
var bodyParser = require('body-parser')

const customerRoute = require("./router/customer.route");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug')
app.set('views', './views')
app.get('/', (req, res) => {
    res.render("")
})
app.get('/about', (req, res) => {
    res.render("about")
})

app.use('/customer', customerRoute);
app.listen(port, () => {
    console.log("App listening on port " + port)
})