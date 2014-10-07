/*
Change these variables as needed
*/
var spidadbUrl = 'https://www.spidasoftware.com/spidadb';
var apiToken = 'aa21d001-b087-4c1a-9f74-728fadde0cca';

var RestClient = require('node-rest-client').Client;

var client = new RestClient();

client.registerMethod("listProjects", spidadbUrl + "/projects.referenced?apiToken="+ apiToken +"&skip=0&limit=100", "GET");

client.registerMethod("listLocations", spidadbUrl + "/locations.referenced?apiToken=" + apiToken + "&skip=0&limit=100", "GET");

/**
 * requests 100 items from spidadb, then calls the callback with the results
 *
 * @param type one of 'projects' or 'locations'
 * @param offset to paginate results
 * @param callback calls this function with the results
 */
var listAll = function(type, offset, callback){
    var method = (type === "projects")? "listProjects" : "listLocations";
    client.methods[method]({skip: offset}, function(data, response){
        if (data.status !== "ok"){
            console.log("Response indicated error");
            console.log(response);
            throw data.error;
        }
        console.log("SPIDA DB returned %i projects", data[type].length);

        callback(data[type]);
        console.log("finished callback");

    })
};

/**
 * requests 100 projects from spidadb then calls the callback function with the results
 *
 * @param callback will be passed an array of referenced projects
 */
var listProjects = function(callback){
    return listAll("projects", 0, callback);
};

/**
 * requests 100 locations from spidadb then calls the callback function with the results
 *
 * @param callback will be passed an array of referenced locations
 */
var listLocations = function(callback){
    return listAll("locations", 0, callback);
};

module.exports = {
	"listProjects": listProjects,
    "listLocations": listLocations
};


