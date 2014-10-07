/**
 * This is a simple NodeJS app that demonstrates consuming data from the SPIDA DB API.
 * To run the application, open a terminal and run `npm install --save` in order to download the dependencies.
 * Then run `npm start` to run the app. Open a browser and go to: http://localhost:3000 to view the reports.
 *
 * The URL and API Token may need to be set first in spidadb-api.js
 *
 */

var expressjs = require("express");
var expHandlebars = require("express-handlebars");
var poleCounts = require("./poleCountReport");
var qcReport = require("./qcLocationReport");

var app = expressjs();

app.engine('handlebars', expHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(expressjs.static(__dirname + '/public'));

app.get('/poleCounts', function(req, res){
	console.log("starting report");
	poleCounts.generatePoleCounts(function(data){
		console.log("finished generating report");
		res.render("poleCounts", data);
	});
	
});

app.get("/qcReport", function(req, res){
    qcReport.generateReport(function(data){
        res.render("qcReport", data);
    });
});

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000);

