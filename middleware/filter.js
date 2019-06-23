const db = require('../db')
var customers = db.get("customers").value();
module.exports.filter = (value) => {
    console.log(value)
    const filter = customers.filter((customer) => {
        return (customer.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || customer.location.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    })
    console.log(filter)
    return filter;
}
