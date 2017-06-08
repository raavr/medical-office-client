import uiRouter from 'angular-ui-router';
import { PatientCreateComponent } from './patient-create.component';
import PatientCreateConfig from './patient-create.config';
import Auth from '../../auth/auth';
import { PatientCreateService } from './patient-create.service'; 

export default 
    angular.module("patient.create", [
            uiRouter, 
            Auth
         ]).config(PatientCreateConfig)
           .component("patientCreate", PatientCreateComponent)
           .service("patientCreateService", PatientCreateService)
           .name;
