const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
const http = require('http');
const hostname = 'localhost';
const port = 3003;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "busigence"
});
const server = http.createServer((req, res) => {
	if (req.url == '/saveRegistrationDetail') {
		console.log("saveRegistrationDetail");
		var body = '';
		req.on('data', function (data) {
			body += data;
		});
		req.on('end', function () {
			var resValues = JSON.parse(body);
			var sql = "INSERT INTO dobbytable (name, password, email) VALUES ("+"'"+resValues.name+"'"+","+"'"+resValues.pass+"'"+","+"'"+resValues.email+"'"+")";
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
		
		let streamData = fs.createReadStream("customers.csv");
		let csvData = [];
		let csvStream = fastcsv.parse()
		  .on("data", function(data) {
			csvData.push(data);
		  })
		  .on("end", function() {
			// remove the first line: header
			csvData.shift();
			let query ="INSERT INTO customers  VALUES ?";
			con.query(query, [csvData], (error, response) => {
			  console.log(error || response);
			});
		  });
		streamData.pipe(csvStream);
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
