var mysql = require("mysql");
var ejs = require("ejs");
var fs = require("fs");

var pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "test"
});

function getResult(queryString, response) {
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }

        try {
            connection.query(queryString, function (err, rows) {
                if (err) {
                    console.log("Error Occured ..............." + err + " for query '" + queryString + "'");
                    throw getDbError(err);
                } else {
                    console.log("Result found after querying is.............. ");
                    var templateStr = fs.readFileSync("./template/list.ejs", "utf8");
                    var resultTemplate = ejs.render(templateStr, {
                        results: rows
                    });
                    console.log("Result is " + resultTemplate);
                    writeResponse(200, resultTemplate, response);
                }
            });
        } finally {
            connection.release();
        }
    });
}

function saveResult(data, response) {
    pool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }
        try {
            connection.query("INSERT INTO customer set ? ", data.getCustomer(), function (err, rows) {
                if (err) {
                    console.log("Error Occured ..............." + err);
                    throw getDbError(err);
                } else {
                    writeResponse(201, "Created the Customer", response);
                }
            });
        } finally {
            connection.release();
        }
    });
}

function getDbError(error) {
    return {name: "DbError", message: error };
}

function writeResponse(code, responseString, response) {
    response.writeHead(code, {"Content-Type": "text/html"});
    response.write(responseString);
    response.end();
}

exports.getInfo = getResult;
exports.save = saveResult;
