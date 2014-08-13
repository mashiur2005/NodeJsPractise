var db = require("../db/db.js");
var ejs = require("ejs");
var fs = require("fs");

function newCustomer(response) {
    var templateFromStr = fs.readFileSync("./template/form.ejs", "utf8");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(ejs.render(templateFromStr, {
        customer : ''
    }));
    response.end();
}
function addCustomer(response, customer) {
    try {
        db.save(customer, response);
    } catch (error) {
        throw error;
    }
}

function updateCustomer(data, response) {
}

function deleteCustomer(response, data) {
}

function getAllCustomer(response) {
    var queryString = "select * from customer";
    try {
        db.getInfo(queryString, response);
    } catch (error) {
        console.log("worked here in catch .............")
        throw error;
    }
}

function getCustomer(response, data) {
    var queryString = "select * from customer c where c.id = " + data.id;
    try {
        db.getInfo(queryString, response);
    } catch (error) {
        throw error;
    }
}

function error() {
    throw {name : "myError", message : "custom error message"};
}

exports.new = newCustomer;
exports.addCustomer = addCustomer;
exports.updateCustomer = updateCustomer;
exports.getCustomer = getCustomer;
exports.allCustomer = getAllCustomer;
exports.deleteCustomer = deleteCustomer;
exports.error = error;
