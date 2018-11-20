import uiRouter from 'angular-ui-router';
import { VisitSignupComponent } from './visit-signup.component';
import { VisitSignupMeComponent } from './user/visit-signup-me.component';
import { VisitSignupUserComponent } from './doctor/visit-signup-user.component';
import { VisitSignupBtnComponent } from './signup-btn/visit-signup-btn.component';
import VisitSignupConfig from './visit-signup.config';
import visitSignupService from './visit-signup.service';
import uiBootstrapTypeahead from 'angular-ui-bootstrap/src/typeahead';
import visitCommon from '../common/visit.common';
import Alert from '../../alert/alert';
import Auth from '../../auth/auth';

export default
  angular.module("visit.signup", [uiRouter, visitSignupService, uiBootstrapTypeahead, visitCommon, Alert, Auth])
    .config(VisitSignupConfig)
    .component("visitSignup", VisitSignupComponent)
    .component("visitSignupMe", VisitSignupMeComponent)
    .component("visitSignupUser", VisitSignupUserComponent)
    .component("visitSignupBtn", VisitSignupBtnComponent)
    .name;