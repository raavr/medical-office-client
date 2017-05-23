import uiRouter from 'angular-ui-router';
import { VisitSignupComponent } from './signup/visit-signup.component';
import { VisitSignupMeComponent } from './signup/user/visit-signup-me.component';
import VisitConfig from './visit.config';
import BtDatepicker from './common/bt-datepicker.directive';
import visitSignupService from './signup/visit-signup.service';

export default 
    angular.module("visit", [uiRouter, visitSignupService])
           .config(VisitConfig)
           .component("visitSignup", VisitSignupComponent)
           .component("visitSignupMe", VisitSignupMeComponent)
           .directive("btDatepicker", BtDatepicker)
           .name;