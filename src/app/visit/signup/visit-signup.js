import uiRouter from 'angular-ui-router';
import { VisitSignupComponent } from './visit-signup.component';
import { VisitSignupMeComponent } from './user/visit-signup-me.component';
import { VisitSignupUserComponent } from './admin/visit-signup-user.component';
import VisitSignupConfig from './visit-signup.config';
import visitSignupService from './visit-signup.service';
import uiBootstrapTypeahead from 'angular-ui-bootstrap/src/typeahead';
import visitCommon from '../common/visit.common';

export default 
    angular.module("visit.signup", [uiRouter, visitSignupService, uiBootstrapTypeahead, visitCommon])
           .config(VisitSignupConfig)
           .component("visitSignup", VisitSignupComponent)
           .component("visitSignupMe", VisitSignupMeComponent)
           .component("visitSignupUser", VisitSignupUserComponent)
           .name;