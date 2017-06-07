export default function PatientBrowseResolve(patientBrowseService) {
      return patientBrowseService.getPatients().toPromise();
}

PatientBrowseResolve.$inject = ['patientBrowseService'];