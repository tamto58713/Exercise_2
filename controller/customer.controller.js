
var pagination = require("../middleware/pagination")
var filter = require("../middleware/filter")
var user = require("../controller/auth.controller")
module.exports.index = (req, res) => {
    const value = filter.value;
    const customers = filter.customersFilter;
    const currentUser = user.currentUser|| {firstName: ""}
    const itemPerPage = pagination.itemPerPage
    const customersPage = pagination.customersPage;
    const currentPage = pagination.currentPage
    const tabPage = pagination.tabPage;
    res.render('customers', {customers: customers, currentPage: currentPage, 
    itemPerPage: itemPerPage, customersPage: customersPage, value:value, currentUser: currentUser, tabPage: tabPage})

}

module.exports.listView = (req, res) => {
    const currentUser = user.currentUser|| {name: ""}
    const value = filter.value;
    const customers = filter.customersFilter;
    res.render('customers/listview', {customers: customers, value: value, currentUser: currentUser})
}

module.exports.login = (req, res) => {
    res.render('customers/login');
}

module.exports.delete = (req, res) => {
    const db = require("../db")

    var customersFilter = filter.customersFilter;

    const value = filter.value;
    const id = parseInt(req.body.id)
    customersFilter = customersFilter.filter((customer) => {
        return customer.id !== id;
    })

    var customers = db.get("customers").value();

    db.get('customers').remove({ id: id }).write()
    console.log(id)

    res.render('customers/listview', {customers: customersFilter, value: value})
}

module.exports.deleteCard = (req, res) => {
    const db = require("../db")

    var customersFilter = filter.customersFilter;
    const currentUser = user.currentUser|| {firstName: ""}
    const itemPerPage = pagination.itemPerPage
    const customersPage = pagination.customersPage;
    const currentPage = pagination.currentPage
    const tabPage = pagination.tabPage;
    const value = filter.value;
    const id = parseInt(req.body.id)
    customersFilter = customersFilter.filter((customer) => {
        return customer.id !== id;
    })

    var customers = db.get("customers").value();

    db.get('customers').remove({ id: id }).write()
    res.render('customers', {customers: customers, currentPage: currentPage, 
            itemPerPage: itemPerPage, customersPage: customersPage, value:value, currentUser: currentUser, tabPage: tabPage})
    
}

module.exports.viewOrders = (req, res) => {
    const currentUser = user.currentUser|| {name: ""}
    const db = require("../db");
    const id = parseInt(req.params.id);
    console.log(id)
    var customer = db.get('customers').find({id: id}).value();
    var products = [];

    var total = 0;
    for (let i = 1; i <= customer.orders; i++) {
        var product = db.get("products").find({id: i}).value();
                price = product.unitPrice;
                if (typeof price === "string")
                    product.unitPrice = parseFloat(price.slice(1))
                total += product.unitPrice * product.quantity;
                products.push(product);
    }
    total = Math.round(total*100)/100;
    res.render('customers/ordersview', {customer: customer, products: products, total: total, currentUser: currentUser})   
}

module.exports.orders = (req, res) => {
    const currentUser = user.currentUser|| {name: ""}
    const id = parseInt(req.query.id) || "";
    const db = require("../db");
    var products = [];
    var total = 0;
    if (id) {
        var customer = db.get('customers').find({id: id}).value();
        for (let i = 1; i <= customer.orders; i++) {
            var product = db.get("products").find({id: i}).value();
                    price = product.unitPrice;
                    if (typeof price === "string")
                        product.unitPrice = parseFloat(price.slice(1))
                    total += product.unitPrice * product.quantity;
                    products.push(product);
        }
    }
    total = Math.round(total*100)/100;
    res.render('customers/orders', {customer: customer, products: products, total: total, value: id, currentUser: currentUser})   

}

module.exports.edit = (req, res) => {
    const db = require("../db")
    const id = parseInt(req.params.id);
    customer = db.get("customers").find({id: id}).value();
    console.log(customer)
    res.render('customers/editview', {customer: customer})
}


module.exports.postEdit = (req, res) => {
    const alert = require('alert-node');
    const db = require("../db")
    const id = parseInt(req.params.id);

    if (req.body.action === "update"){
        db.get('customers').find({ id: id}).assign(
            { "first_name": req.body.first_name }, 
            { "last_name": req.body.last_name },
            { "email": req.body.email },
            { "gender": req.body.gender },
            { "city": req.body.city },
            { "state": req.body.state },
            { "zip": req.body.zip }
          
        ).write()
        alert(("Update this customer successfuly!"));
    }
    else {
        db.get('customers').remove({ id: id }).write();
        alert("Remove this customer successfuly!");
    }
    res.redirect("/customers")
}
   
