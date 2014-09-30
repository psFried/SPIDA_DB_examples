var Datastore = require("nedb");

var db = {};

db.projects = new Datastore("projects.db");
db.reports = new Datastore("reports.db");

db.projects.loadDatabase();
db.reports.loadDatabase();

var containsProject = function(projectId){
	if (db.projects.findOne({"id": projectId})){
		return true;
	}
	return false;
};

module.exports = {
	"db": db,
	"containsProject": containsProject
};