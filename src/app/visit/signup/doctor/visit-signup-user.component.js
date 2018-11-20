import template from "./visit-signup-user.component.html";
import { VisitSignupBaseController } from "../base/visit-signup-base.controller";

class VisitSignupUserController extends VisitSignupBaseController {
  constructor(visitSignupService, alertEventService, authService, $state) {
    super();
    this.visitSignupService = visitSignupService;
    this.alertEventService = alertEventService;
    this.authService = authService;
    this.$state = $state;
  }

  $onInit() {
    this.disabledDates = this.resolve.disabledDates;
  }

  addVisit() {
    this.visitSignupService.addVisit(this.visit).subscribe(
      () => {
        this.alertEventService.showSuccessAlert(`Pacjent ${this.asyncSelectedUser} został zapisany na wizytę.`);
        this.close();
      },
      (err) => {
        this.alertEventService.showDangerAlert(err.data.message);
        this.getAvailableTimes();
        this.close();
      }
    );
  }

  findUsers(userName) {
    return this.visitSignupService
      .findUsers(userName)
      .toPromise();
  }

  isSubmitDisabled() {
    return super.isSubmitDisabled() 
      || this.asyncSelectedUser !== this.userSelected.name;
  }
}

VisitSignupUserController.$inject = ['visitSignupService', 'alertEventService', 'authService', '$state'];

export const VisitSignupUserComponent = {
  bindings: {
    resolve: "<",
    close: '&',
    dismiss: '&'
  },
  template,
  controller: VisitSignupUserController
}