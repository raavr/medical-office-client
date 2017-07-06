import uiRouter from 'angular-ui-router';
import { ResetPassComponent } from './reset-pass.component';
import ResetPassConfig from './reset-pass.config';
import { ResetPassService } from './reset-pass.service';

export default 
    angular.module("reset-pass", [uiRouter])
           .config(ResetPassConfig)
           .component("resetPass", ResetPassComponent)
           .service("resetPassService", ResetPassService)
           .name;
