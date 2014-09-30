/*
Change these variables as needed
*/
var spidadbUrl = 'https://www.spidasoftware.com/spidadb';
var apiToken = 'aa21d001-b087-4c1a-9f74-728fadde0cca';

var RestClient = require('node-rest-client').Client;

var client = new RestClient();

client.registerMethod("listProjects", spidadbUrl + "/projects.referenced?apiToken="+ apiToken +"&skip=0&limit=100", "GET");


var listAllProjects = function(offset, collector, callback){

	client.methods.listProjects({skip: offset}, function(data, response){
		if (data.status !== "ok"){
			console.log("Response indicated error");
			console.log(response);
			return;
		}

		console.log("SPIDA DB returned $i projects", data.projects.length);

		var newCollector = collector.concat(data.projects);
		if (data.projects.length === 100){
			console.log("recursively calling listAllProjects with collector of length: " + newCollector.length);
			listProjects(offset + 100, newCollector, callback);

		} else {
			console.log("retrieved all projects");
			callback(newCollector);
			console.log("finished callback");
		}
	});
}

module.exports = {
	"listAllProjects": listAllProjects
};


