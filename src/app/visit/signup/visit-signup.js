import uiRouter from 'angular-ui-router';
import { VisitSignupComponent } from './visit-signup.component';
import { VisitSignupMeComponent } from './user/visit-signup-me.component';
import { VisitSignupUserComponent } from './admin/visit-signup-user.component';
import VisitSignupConfig from './visit-signup.config';
import BtDatepicker from './common/bt-datepicker.directive';
import visitSignupService from './visit-signup.service';
import uiBootstrapTypeahead from 'angular-ui-bootstrap/src/typeahead';

export default 
    angular.module("visit.signup", [uiRouter, visitSignupService, uiBootstrapTypeahead])
           .config(VisitSignupConfig)
           .component("visitSignup", VisitSignupComponent)
           .component("visitSignupMe", VisitSignupMeComponent)
           .component("visitSignupUser", VisitSignupUserComponent)
           .directive("btDatepicker", BtDatepicker)
           .name;