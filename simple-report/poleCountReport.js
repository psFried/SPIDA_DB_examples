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

var getPoleCountByUser = function(projects){
	var counts = {};
	for (var i = 0; i < projects.length; i++){
		var proj = projects[i];
		var usr = proj.user.email;
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

var generatePoleCountReport = function(renderFunction){
	api.listAllProjects(function(projects){
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