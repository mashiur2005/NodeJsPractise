var mysql = require("mysql");
var ejs = require("ejs");
var fs = require("fs");
var templateStr = fs.readFileSync("./template/list.ejs", "utf8");

var pool =  mysql.createPool({
    host : "localhost",
    port : "3306",
    user : "root",
    password : "",
    database : "test"
});

function testEjs(result) {
    var ret = ejs.render(templateStr, {
        results: result
    });
    console.log(ret);
}

function getResult(queryString, response) {
    pool.getConnection(function(err, connection) {
        connection.query(queryString, function(err, rows) {
            if (err) {
                console.log("Error Occured ..............." + err + " for query '" + queryString + "'");
                writeResponse(500, err, response);
            } else {
                console.log("Result found after querying is.............. ");
                var resultTemplate = ejs.render(templateStr, {
                    results: rows
                });
                console.log("Result is " + resultTemplate);
                writeResponse(200, resultTemplate, response);
            }
        });
        connection.release();
    });
}

function saveResult(data, response) {
    pool.getConnection(function(err, connection) {
        connection.query("INSERT INTO customer set ? ", data , function(err, rows) {
            if (err) {
                console.log("Error Occured ..............." + err + " for query '" + queryString + "'");
                writeResponse(500, err, response);
            } else {
                writeResponse(201, "Created the Customer", response);
            }
        });
        connection.release();
    });
}

function writeResponse(code, responseString, response) {
    response.writeHead(code, {"Content-Type": "text/html"});
    response.write(responseString);
    response.end();
}

exports.getInfo = getResult;
exports.save = saveResult;
