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



