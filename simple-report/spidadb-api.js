/*
Change these variables as needed
*/
var spidadbUrl = 'https://www.spidasoftware.com/spidadb';
var apiToken = 'aa21d001-b087-4c1a-9f74-728fadde0cca';

var RestClient = require('node-rest-client').Client;

var client = new RestClient();

client.registerMethod("listProjects", spidadbUrl + "/projects.referenced?apiToken="+ apiToken +"&skip=0&limit=100", "GET");

client.registerMethod("listLocations", spidadbUrl + "/locations.referenced?apiToken=" + apiToken + "&skip=0&limit=100", "GET");

var listAll = function(type, offset, collector, callback){
    var method = (type === "projects")? "listProjects" : "listLocations";
    client.methods[method]({skip: offset}, function(data, response){
        if (data.status !== "ok"){
            console.log("Response indicated error");
            console.log(response);
            return;
        }

        console.log("SPIDA DB returned $i projects", data[type].length);

        var newCollector = collector.concat(data[type]);
        if (data[type].length === 100){
            console.log("recursively calling listAllProjects with collector of length: " + newCollector.length);
            listAll(type, offset + 100, newCollector, callback);

        } else {
            console.log("retrieved all projects");
            callback(newCollector);
            console.log("finished callback");
        }
    })
};

var listAllProjects = function(callback){
    return listAll("projects", 0, [], callback);
};

var listAllLocations = function(callback){
    return listAll("locations", 0, [], callback);
};

module.exports = {
	"listAllProjects": listAllProjects,
    "listAllLocations": listAllLocations
};


