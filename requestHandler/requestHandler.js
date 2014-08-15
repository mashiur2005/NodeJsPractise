var db = require("../db/db.js");
var ejs = require("ejs");
var fs = require("fs");
var customer = require("../model/customer");
var customerRenderComponent = require("../model/CustomerRenderComponents");

function newCustomer(response, data) {
    var templateFromStr = fs.readFileSync("./template/form.ejs", "utf8");
    if (data.id && data.id !== '') {
        var customerComponent = new customerRenderComponent.CustomerRenderComponents(response, data, ejs);
        try {
            db.getCustomerById(customerComponent);
        } catch (Error) {
            throw Error;
        }
    } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(ejs.render(templateFromStr, {
            customer : data,
            formPostLink : "/customer/add"
        }));
        response.end();
    }
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
