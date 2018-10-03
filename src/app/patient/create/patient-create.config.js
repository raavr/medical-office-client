import AuthGuardAdmin from '../../auth/auth-guard-admin.service';

export default function PatientCreateConfig($stateProvider) {
  $stateProvider.state({
    name: "patient-create",
    url: "/patient/create",
    component: "patientCreate",
    resolve: {
      canActivate: AuthGuardAdmin
    }
  });
}


PatientCreateConfig.$inject = ['$stateProvider'];