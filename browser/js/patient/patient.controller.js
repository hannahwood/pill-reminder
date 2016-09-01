var getAge = require('get-age');

module.exports = function($scope, patient, PatientFactory) {

	// PATIENT SETTINGS:-----
    $scope.patient = patient;
    $scope.index = PatientFactory.fetchIndexById(patient.id);
    $scope.patients = PatientFactory.patients;
    $scope.age = getAge($scope.patient.dob);
    // ----------------------


    // CALENDAR SETTINGS:----
    $scope.dateFormat = 'dd-MMMM-yyyy';
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(2025, 12, 31),
        minDate: new Date(),
        startingDay: 1
    };
    $scope.calendarPopup = {};
    $scope.openCalendar = function(condition) {
        $scope.calendarPopup[condition] = {};
        $scope.calendarPopup[condition].opened = true;
    };
    // ----------------------


    // REMINDERS:------------
    $scope.submitReminder = function(condition) {
        $scope.patients[$scope.index].conditionsMeds[condition].push($scope.patient[condition]);
        $scope.patient[condition] = {};
    }
    $scope.deleteReminder = function(condition, index) {
    	$scope.patients[$scope.index].conditionsMeds[condition].splice(index, 1);
    }
    // ----------------------


    // CONDITIONS:-----------
    $scope.submitCondition = function() {
    	$scope.patients[$scope.index].conditionsMeds[$scope.newCondition] = [];
    	$scope.newCondition = '';
    	$scope.conditionFormToggle();
    }
    $scope.deleteCondition = function(condition) {
    	delete $scope.patients[$scope.index].conditionsMeds[condition];
    }
    $scope.addConditionForm = false;
    $scope.conditionFormToggle = function() {
        $scope.addConditionForm = !$scope.addConditionForm;
    }
    // ----------------------
};
