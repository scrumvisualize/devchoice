var mysql = require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'C@rnagieMe11on',
    database : 'devchoice'
});

// make to connection to the database.
connection.connect();
const checkValidSession = () => {
    connection.query("SELECT status, nom.id FROM devchoice.nominationsession nom JOIN (SELECT MAX(id) AS id FROM devchoice.nominationsession) max on nom.id = max.id;", function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        // iterate for all the status in the result
        Object.keys(result).forEach(function (key) {
            var status = result[key];
            console.log(status);
            return status;
        });
    });
}

export { checkValidSession };


