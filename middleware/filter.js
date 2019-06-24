var db = require("../db")

module.exports.filter = (req, res, next) => {
    var customers = db.get('customers').value();
    const value = req.query.f || ""
    const filter = customers.filter((customer) => {
        return (customer.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || customer.location.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    })
    module.exports.customers = filter;
    module.exports.value = value;
    next()
}
