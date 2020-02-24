const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
const http = require('http');
const hostname = 'localhost';
const port = 3001;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "busigence"
});
const server = http.createServer((req, res) => {
	if (req.url == '/loaddatafromcsv') {
		console.log("loaddatafromcsv");
		let streamData = fs.createReadStream("customers.csv");
		let csvData = [];
		let csvStream = fastcsv.parse().on("data", function(data) {
			csvData.push(data);
			}).on("end", function() {
				csvData.shift();
				let query ="INSERT INTO customers  VALUES ?";
				con.query(query, [csvData], (error, response) => {
				  console.log(error || response);
				});
			}); 
		streamData.pipe(csvStream);
		res.setHeader('Content-Type', 'application/json');
		res.end("data Loaded in db");
		
	} else if (req.url == '/sqlLoginAuth') {
		console.log('sqlLoginAuth');
		var body = '';
		req.on('data', function (data) {
			
			body += data;
		});
		req.on('end', function () {
			console.log("AKS"+body);
			
			var sql="show databases";
			//var sql = "select * from customers";
			//var sql = "show tables";
			console.log(sql);
			con.query(sql, function (err, result) {
				console.log("No of Record: "+result);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.setHeader('Access-Control-Allow-Origin', '*');
				 if (err){
					res.end(JSON.stringify({response:'Logged In Failed!'}));
					
				}
				if(result.length>0){
					res.end(JSON.stringify({response:'success'}));
				 } else {
					res.end(JSON.stringify({response:'Username or Password is wrong!'}));
				 }
			});
		});
	} else if (req.url == '/testmainapp') {
		res.setHeader('Content-Type', 'application/json');
		res.end("Hi I am Active.");
	}else {
		res.statusCode = 500;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Invalid');
	}
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
