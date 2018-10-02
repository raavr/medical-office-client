import { AlertComponent } from './alert.component';
import { AlertEventService } from './alert-event.service';

export default
  angular.module("alert", [])
    .component("alert", AlertComponent)
    .service("alertEventService", AlertEventService)
    .name;
