import uiRouter from 'angular-ui-router';
import { PatientBrowseComponent } from './patient-browse.component';
import { PatientItemComponent } from './patient-item/patient-item.component';
import PatientBrowseConfig from './patient-browse.config';
import Auth from '../../auth/auth';
import { PatientBrowseService } from './patient-browse.service'; 
import { PatientItemService } from './patient-item/patient-item.service'; 
import uiBootstrapTooltip from 'angular-ui-bootstrap/src/tooltip';

export default 
    angular.module("patient.browse", [
            uiRouter, 
            Auth,
            uiBootstrapTooltip
         ]).config(PatientBrowseConfig)
           .component("patientBrowse", PatientBrowseComponent)
           .component("patientItem", PatientItemComponent)
           .service("patientBrowseService", PatientBrowseService)
           .service("patientItemService", PatientItemService)
           .name;
