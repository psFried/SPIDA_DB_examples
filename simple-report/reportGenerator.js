var api = require('./spidadb-api');

var getDataFromProjects = function(projects){
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

	return counts;
}

var convertToArray = function(dataObj){
	var dataArray = [];
	for (var key in dataObj){
		if (dataObj.hasOwnProperty(key)){
			var obj = {name: key, count: dataObj[key]};
			dataArray.push(obj);
		}
	}
	return dataArray;
}

var generateReport = function(renderFunction){
	api.listAllProjects(0, [], function(projects){
		var data = getDataFromProjects(projects);
		console.log("Data returned from generator:");
		console.log(data);
		renderFunction({"data": convertToArray(data)});
	});
}


module.exports = {
	generate: generateReport
}