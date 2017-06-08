import patientBrowse from './browse/patient-browse';
import patientCreate from './create/patient-create';

export default 
    angular.module("patient", [
        patientBrowse,
        patientCreate
    ]).name;