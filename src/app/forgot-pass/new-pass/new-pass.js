import uiRouter from 'angular-ui-router';
import PasswordMatch from '../../account/password/password-match';
import { NewPassComponent } from './new-pass.component';
import NewPassConfig from './new-pass.config';
import { NewPassService } from './new-pass.service';

export default
  angular.module("new-pass", [uiRouter, PasswordMatch])
    .config(NewPassConfig)
    .component("newPass", NewPassComponent)
    .service("newPassService", NewPassService)
    .name;
