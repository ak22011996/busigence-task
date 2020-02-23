const mysql = require('mysql');
const http = require('http');
const hostname = 'localhost';
const port = 3002;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "busigence"
});
const server = http.createServer((req, res) => {
	if (req.url == '/jointranformationresult') {
		console.log("jointranformationresult");
		var body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			var resValues = JSON.parse(body);
			let table1Data = resValues.table1Data;
			let table2Data = resValues.table2Data;
			var joinType = "inner";
			var columnName = resValues.columnName;
			//var sql = "SELECT * FROM dobbytable (name, password, email) VALUES ("+"'"+resValues.name+"'"+","+"'"+resValues.pass+"'"+","+"'"+resValues.email+"'"+")";
			con.query(sql, function (err, result) {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				if (err){
					res.end(JSON.stringify({response:'Registered Failed'}));
					throw err;
				}
				res.end(JSON.stringify({response:'Registered Successfully'}));
			});
		});
	} else if (req.url == '/testnode') {
		res.setHeader('Content-Type', 'application/json');
		res.end("Hi I am active.");
		
	}else {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Invalid');
	}
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
