export default function PatientBrowseResolve(patientBrowseService) {
  return patientBrowseService.getPatients().toPromise().catch(() => { });
}

PatientBrowseResolve.$inject = ['patientBrowseService'];