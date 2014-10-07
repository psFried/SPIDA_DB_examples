var api = require('./spidadb-api');

var convertToArray = function(dataObj){
	var dataArray = [];
	for (var key in dataObj){
		if (dataObj.hasOwnProperty(key)){
			var obj = {name: key, count: dataObj[key]};
			dataArray.push(obj);
		}
	}
	return dataArray;
};

/**
 * returns an array of objects containing username and pole count. The following format is used:
 * [
 *   {
 *     "name": <username>,
 *     "count": <poleCount>
 *   },
 *   ...
 * ]
 *
 * @param projects an array of spidadb referenced projects.
 */
var getPoleCountByUser = function(projects){
	var counts = {};
	for (var i = 0; i < projects.length; i++){
		var proj = projects[i];

		var usr = 'default user';
        if (proj.hasOwnProperty('user') && proj.user.hasOwnProperty('email')){
            usr = proj.user.email;
        }

		console.log("updating counts for project %s by user: %s", proj.calcProject.label, usr);
		if (typeof counts[usr] === 'undefined'){
			counts[usr] = 0;
		}

		for (var a = 0; a < proj.calcProject.leads.length; a++){
			var lead = proj.calcProject.leads[a];
			counts[usr] += lead.locations.length;
		}
	}

	return convertToArray(counts);
};

/**
 * creates an object with two properties:
 * "title": the title of the report
 * "poleCountsByUser": an array of objects, each having a 'name' and a 'count' property.
 *
 * @param renderFunction callback that get's passed the object that was created
 */
var generatePoleCountReport = function(renderFunction){
	api.listProjects(function(projects){
		var data = {};
		data.title = "Pole Counts by User";
		data.poleCountsByUser = getPoleCountByUser(projects);

		console.log("Data returned from generator:");
		console.log(data);
		renderFunction(data);
	});
};




module.exports = {
	generatePoleCounts: generatePoleCountReport
};