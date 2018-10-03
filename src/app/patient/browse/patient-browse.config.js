import PatientBrowseResolve from './patient-browse.resolve';
import AuthGuardAdmin from '../../auth/auth-guard-admin.service';

export default function PatientBrowseConfig($stateProvider) {
  $stateProvider.state({
    name: "patient-browse",
    url: "/patient/browse",
    component: "patientBrowse",
    resolve: {
      canActivate: AuthGuardAdmin,
      patients: PatientBrowseResolve
    }
  });
}


PatientBrowseConfig.$inject = ['$stateProvider'];