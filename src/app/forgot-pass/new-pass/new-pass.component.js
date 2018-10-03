import "./new-pass.component.scss";
import template from "./new-pass.component.html";

class NewPassController {
  constructor(newPassService, alertEventService, $state) {
    this.newPassService = newPassService;
    this.alertEventService = alertEventService;
    this.$state = $state;
    this.password = {};
  }

  setNewPass() {
    this.newPassService
      .setNewPassword(this.token, { password: this.password.newPass })
      .subscribe(
        (data) => {
          this.alertEventService.showSuccessAlert(data.message);
        },
        (err) => {
          this.alertEventService.showDangerAlert(err.data.message);
        },
        () => this.$state.go("login")
      );
  }

}

NewPassController.$inject = ['newPassService', 'alertEventService', '$state'];

export const NewPassComponent = {
  bindings: {
    token: "<"
  },
  template,
  controller: NewPassController
}