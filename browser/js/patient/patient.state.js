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