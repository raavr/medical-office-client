import uiRouter from 'angular-ui-router';
import uiBootstrapModal from 'angular-ui-bootstrap/src/modal';
import { PatientBrowseComponent } from './patient-browse.component';
import { PatientItemComponent } from './patient-item/patient-item.component';
import PatientBrowseConfig from './patient-browse.config';
import Auth from '../../auth/auth';
import { PatientBrowseService } from './patient-browse.service';
import { PatientItemService } from './patient-item/patient-item.service';
import uiBootstrapTooltip from 'angular-ui-bootstrap/src/tooltip';
import Alert from '../../alert/alert';

export default
  angular.module("patient.browse", [
    uiRouter,
    Auth,
    uiBootstrapTooltip,
    uiBootstrapModal,
    Alert
  ]).config(PatientBrowseConfig)
    .component("patientBrowse", PatientBrowseComponent)
    .component("patientItem", PatientItemComponent)
    .service("patientBrowseService", PatientBrowseService)
    .service("patientItemService", PatientItemService)
    .name;
