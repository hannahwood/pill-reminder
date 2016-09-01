module.exports = function() {
    var patientsArray = require('./patient.data')
    return {
        fetchById: function(id) {
            return patientsArray.find(function(patient) {
                return patient.id == id;
            })
        },
        fetchIndexById: function(id) {
            return patientsArray.findIndex(function(patient) {
                return patient.id == id;
            })
        },
        fetch: function() {
            return patientsArray.slice();
        },
        patients: patientsArray,
        match: function(person, str) {
            var fullName = person.firstName + ' ' + person.lastName;
            if ((person.firstName.toLowerCase().indexOf(str) >= 0) ||
                (person.lastName.toLowerCase().indexOf(str) >= 0) ||
                (fullName.toLowerCase().indexOf(str) >= 0)) {
                return true;
            }
            for (var j = 0; j < person.meds.length; j++) {
                if (person.meds[j].brand.toLowerCase().indexOf(str) >= 0) {
                    return true;
                }
            }
            for (key in person.conditionsMeds) {
                if (key.toLowerCase().indexOf(str) >= 0) {
                    return true;
                }
            }
            return false;
        }
    }
}
