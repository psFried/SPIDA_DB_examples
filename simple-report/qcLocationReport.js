var api = require("./spidadb-api");
var _ = require("underscore");


var getDifferences = function(location){
    var forms = location.calcLocation.forms;
    var diffs = null;
    if (forms){
        forms.forEach(function(form){
            if (form.title === "Design Comparison"){
                diffs = form.fields.Differences;
            }
        });
    }
    return diffs;
};

var addDiffCounts = function(counts, diffs){
    diffs.forEach(function(diff){
        var t = diff.Type;
        var obj = _.find(counts, function(it){
            return it.type === t;
        });

        if (!obj){
            obj = {type: t, count:0};
            counts.push(obj);
        }

        obj.count++;
    });
};

var createUsrDataObj = function(usr){
    return {
        name: usr,
        okLocations: 0,
        problemLocations: 0,
        diffCounts: []
    };
};

var getDifferencesByUserAndType = function(locations){
    var data = [];

    locations.forEach(function(location){
        var usr = location.user.email;
        var usrData = _.find(data, function(obj){
            return obj.name === usr;
        });
        if (!usrData){
            usrData = createUsrDataObj(usr);
            data.push(usrData);
        }

        var diffs = getDifferences(location);
        if (diffs !== null){
            usrData.problemLocations++;
            addDiffCounts(usrData.diffCounts, diffs);
        } else {
            usrData.okLocations++;
        }
    });
    return {'data':data};
};



var getReportData = function(renderFun){
    api.listAllLocations(function(locations){
        var data = getDifferencesByUserAndType(locations);
        console.log("finished generating data, rendering results");
        renderFun(data);
    });
};

module.exports = {
    'generateReport': getReportData
};




