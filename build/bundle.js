(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('PillReminder', ['ui.router', 'ui.bootstrap', 'angucomplete-alt'])
    .config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    })
    .config(function($stateProvider) {
        $stateProvider.state('home', require('./home/home.state'));
        $stateProvider.state('patient', require('./patient/patient.state'));
    })
    .controller('HomeController', require('./home/home.controller'))
    .controller('PatientController', require('./patient/patient.controller'))
    .directive('navbar', require('./navbar/navbar.directive'))
    .factory('PatientFactory', require('./patient/patient.factory'));




},{"./home/home.controller":2,"./home/home.state":3,"./navbar/navbar.directive":4,"./patient/patient.controller":5,"./patient/patient.factory":7,"./patient/patient.state":8}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
module.exports = {
    url: '/',
    templateUrl: 'js/home/home.html',
    controller: 'HomeController'
};

},{}],4:[function(require,module,exports){
module.exports = function() {
    return {
        restrict: 'E',
        templateUrl: 'js/navbar/navbar.html'
    }
};
},{}],5:[function(require,module,exports){
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

},{"get-age":9}],6:[function(require,module,exports){
module.exports = [{
            id: '1jb412hj232j21hj31',
            firstName: 'Thomas',
            lastName: 'Anderson',
            gender: 'male',
            dob: new Date(1985, 2, 19),
            imageUrl: '/static/images/thomas.png',
            conditionsMeds: {
                'ADHD': [{
                    'brand': 'Ritalin',
                    'dosage': '30mg',
                    'frequency': 3,
                    'timePeriod': 'week',
                    'until': new Date(2017, 3, 30)

                }, {
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }]
            }
        }, {
            id: 's8q09fqcen28c9snsmf8',
            firstName: 'Regina',
            lastName: 'Carter',
            gender: 'female',
            dob: new Date(1992, 11, 15),
            imageUrl: '/static/images/regina.png',
            conditionsMeds: {
                'Asthma': [{
                    'brand': 'Adderall',
                    'dosage': '2mg',
                    'frequency': 2,
                    'timePeriod': 'day',
                    'until': new Date(2019, 5, 10)
                }, {
                    'brand': 'Ritalin',
                    'dosage': '30mg',
                    'frequency': 3,
                    'timePeriod': 'week',
                    'until': new Date(2017, 3, 30)

                }],
                'Anxiety': [{
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }, {
                    'brand': 'Qwerty',
                    'dosage': '2mg',
                    'frequency': 2,
                    'timePeriod': 'day',
                    'until': new Date(2017, 3, 30)
                }, {
                    'brand': 'Ritalin',
                    'dosage': '30mg',
                    'frequency': 3,
                    'timePeriod': 'week',
                    'until': new Date(2017, 3, 30)

                }],
                'Cold': [{
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }]
            }
        }, {
            id: 'j1h2bjh3b1j222hj09a',
            firstName: 'Jenny',
            lastName: 'Chu',
            gender: 'female',
            dob: new Date(1992, 3, 10),
            imageUrl: '/static/images/jenny.png',
            conditionsMeds: {
                'Cystic Fibrosis': [{
                    'brand': 'Adderall',
                    'dosage': '2mg',
                    'frequency': 2,
                    'timePeriod': 'day',
                    'until': new Date(2018, 1, 20)
                }],
                'Ear Infection': [{
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }]
            }
        }, {
            id: 'qpq9388c9xncn38f9',
            firstName: 'Caroline',
            lastName: 'Davidson',
            gender: 'female',
            dob: new Date(1995, 11, 1),
            imageUrl: '/static/images/caroline.png',
            conditionsMeds: {
                'Asthma': [{
                    'brand': 'Adderall',
                    'dosage': '2mg',
                    'frequency': 2,
                    'timePeriod': 'day',
                    'until': new Date(2019, 5, 10)
                }, {
                    'brand': 'Ritalin',
                    'dosage': '30mg',
                    'frequency': 3,
                    'timePeriod': 'week',
                    'until': new Date(2017, 3, 30)

                }],
                'Anxiety': [{
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }],
                'Cold': [{
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }]
            }
        }, {
            id: '10c0v280367llalajf',
            firstName: 'Richard',
            lastName: 'Klein',
            gender: 'male',
            dob: new Date(1951, 9, 12),
            imageUrl: '/static/images/richard.png',
            conditionsMeds: {
                'Cystic Fibrosis': [{
                    'brand': 'Adderall',
                    'dosage': '2mg',
                    'frequency': 2,
                    'timePeriod': 'day',
                    'until': new Date(2018, 1, 20)
                }, {
                    'brand': 'Ritalin',
                    'dosage': '30mg',
                    'frequency': 3,
                    'timePeriod': 'week',
                    'until': new Date(2017, 3, 30)

                }],
                'Ear Infection': [{
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }]
            }
        }, {
            id: '78qva1i4i-vks9xuc',
            firstName: 'Anne',
            lastName: 'Owen',
            gender: 'female',
            dob: new Date(1962, 2, 1),
            imageUrl: '/static/images/anne.png',
            conditionsMeds: {
                'High Blood Pressure': [{
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }]
            }
        }, {
            id: '1092xw9sa4s789s7df8',
            firstName: 'Rick',
            lastName: 'Singh',
            gender: 'male',
            dob: new Date(1990, 7, 22),
            imageUrl: '/static/images/rick.png',
            conditionsMeds: {
                'Anxiety': [{
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }],
                'Cold': [{
                    'brand': 'Advil',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }]
            }
        }, {
            id: 'j12318d7b9msmksm234',
            firstName: 'John',
            lastName: 'Wen',
            gender: 'male',
            dob: new Date(1960, 12, 29),
            imageUrl: '/static/images/john.png',
            conditionsMeds: {
                'Diabetes': [{
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }]
            }
        }, {
            id: 'mk12149as82991089',
            firstName: 'Ken',
            lastName: 'Williams',
            gender: 'female',
            dob: new Date(1984, 6, 6),
            imageUrl: '/static/images/ken.png',
            conditionsMeds: {
                'Cystic Fibrosis': [{
                    'brand': 'Adderall',
                    'dosage': '2mg',
                    'frequency': 2,
                    'timePeriod': 'day',
                    'until': new Date(2018, 1, 20)
                }],
                'Ear Infection': [{
                    'brand': 'Januvia',
                    'dosage': '200mcg',
                    'frequency': 1,
                    'timePeriod': 'day',
                    'until': new Date(2017, 5, 1)

                }]
            }
        }];
},{}],7:[function(require,module,exports){
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

},{"./patient.data":6}],8:[function(require,module,exports){
module.exports = {
    url: '/:patientId',
    templateUrl: 'js/patient/patient.html',
    controller: 'PatientController',
    resolve: {
        patient: function(PatientFactory, $stateParams) {
            return PatientFactory.fetchById($stateParams.patientId);
        }
    }
};

},{}],9:[function(require,module,exports){
'use strict'

// http://stackoverflow.com/questions/4060004/calculate-age-in-javascript/7091965#7091965
module.exports = function getAge (dateString) {
  var today = new Date()
  var birthDate = new Date(dateString)
  var age = today.getFullYear() - birthDate.getFullYear()
  var month = today.getMonth() - birthDate.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

},{}]},{},[1]);
