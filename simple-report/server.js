var expressjs = require("express");
var expHandlebars = require("express-handlebars");
var poleCounts = require("./poleCountReport");

var app = expressjs();

app.engine('handlebars', expHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(expressjs.static(__dirname + '/public'));

app.get('/report', function(req, res){
	console.log("starting report");
	poleCounts.generatePoleCounts(function(data){
		console.log("finished generating report");
		res.render("poleCounts", data);
	});
	
});

app.get('/', function (req, res) {
    res.render('home');
});



app.listen(3000);

