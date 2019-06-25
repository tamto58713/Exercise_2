const db = require("../db")
module.exports.filter = (req, res, next) => {
    const customers = db.get("customers").value();
    const value = req.query.f || ""
    
    const filter = customers.filter((customer) => {
        return (customer.last_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || customer.first_name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || customer.location.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    })  
    module.exports.customersFilter = filter;
    module.exports.customers = customers;
    module.exports.value = value;
    next();
}
