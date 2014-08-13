var server = require("./server/server");
var route = require("./route/route");
var requestHandler = require("./requestHandler/requestHandler");

var handle = {};

handle["/customer/new"] = requestHandler.new;
handle["/customer/all"] = requestHandler.allCustomer;
handle["/customer"] = requestHandler.getCustomer; /*expecting query parameter here*/
handle["/customer/add"] = requestHandler.addCustomer
handle["/customer/errortest"] = requestHandler.error

server.start(route.route, handle);
