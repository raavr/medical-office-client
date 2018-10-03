import "./reset-pass.component.scss";
import template from "./reset-pass.component.html";
import { Observable } from 'rxjs/Observable';

class ResetPassController {
  constructor(resetPassService, alertEventService, $scope) {
    this.resetPassService = resetPassService;
    this.alertEventService = alertEventService;
    this.$scope = $scope;
  }

  resetPass() {
    this.resetPassService
      .resetPassword({ email: this.email })
      .subscribe(
        (data) => {
          this.alertEventService.showSuccessAlert(data.message);
          this.resetForm();
        },
        (err) => {
          this.alertEventService.showDangerAlert(err.data.message);
        }
      );
  }

  resetForm() {
    this.$scope.resetPassForm.$setPristine();
    this.email = '';
  }

}

ResetPassController.$inject = ['resetPassService', 'alertEventService', '$scope'];

export const ResetPassComponent = {
  template,
  controller: ResetPassController
}