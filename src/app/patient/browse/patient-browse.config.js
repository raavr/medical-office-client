import PatientBrowseResolve from './patient-browse.resolve';
import AuthGuardDoctor from '../../auth/auth-guard-doctor.service';

export default function PatientBrowseConfig($stateProvider) {
  $stateProvider.state({
    name: "patient-browse",
    url: "/patient/browse",
    component: "patientBrowse",
    resolve: {
      canActivate: AuthGuardDoctor,
      patients: PatientBrowseResolve
    }
  });
}


PatientBrowseConfig.$inject = ['$stateProvider'];