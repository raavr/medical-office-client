import uiRouter from 'angular-ui-router';
import { VisitSignupComponent } from './visit-signup.component';
import { VisitSignupMeComponent } from './user/visit-signup-me.component';
import VisitSignupConfig from './visit-signup.config';
import BtDatepicker from './common/bt-datepicker.directive';
import visitSignupService from './visit-signup.service';

export default 
    angular.module("visit.signup", [uiRouter, visitSignupService])
           .config(VisitSignupConfig)
           .component("visitSignup", VisitSignupComponent)
           .component("visitSignupMe", VisitSignupMeComponent)
           .directive("btDatepicker", BtDatepicker)
           .name;