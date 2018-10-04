import AuthGuardDoctor from '../../auth/auth-guard-doctor.service';

export default function PatientCreateConfig($stateProvider) {
  $stateProvider.state({
    name: "patient-create",
    url: "/patient/create",
    component: "patientCreate",
    resolve: {
      canActivate: AuthGuardDoctor
    }
  });
}


PatientCreateConfig.$inject = ['$stateProvider'];