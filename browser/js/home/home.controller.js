module.exports = function($scope, PatientFactory) {
    function spreadDrugs(patients) {
        return patients.map(function(patient) {
            patient.meds = [];
            Object.keys(patient.conditionsMeds).forEach(function(condition) {
                patient.meds.push(...patient.conditionsMeds[condition]);
            });
            patient.threeMeds = patient.meds.slice(0, 3);
            return patient;
        });
    };

    $scope.patients = spreadDrugs(PatientFactory.fetch());

    $scope.matches = $scope.patients.slice();

    $scope.placeholder = 'Search patients by name, condition, or medication...';

    $scope.localSearch = function(str) {
        var str = str.toString().toLowerCase();
        if (str.length) {
            $scope.matches = [];
            for (var i = 0; i < $scope.patients.length; i++) {
                var person = $scope.patients[i];
                if (PatientFactory.match(person, str)) {
                    $scope.matches.push(person);
                }
            };
        } else {
            $scope.matches = $scope.patients.slice();
        }
        return $scope.matches;
    };
};
