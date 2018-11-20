import "./visit-signup-me.component.scss";
import template from "./visit-signup-me.component.html";
import { VisitSignupBaseController } from '../base/visit-signup-base.controller';

class VisitSignupMeController extends VisitSignupBaseController {
  constructor(visitSignupService, alertEventService, authService, $state) {
    super();
    this.visitSignupService = visitSignupService;
    this.alertEventService = alertEventService;
    this.authService = authService;
    this.$state = $state;
  }

  $onInit() {
    this.doctorsList = this.resolve.doctorsList;
  }

  addVisit() {
    this.visitSignupService.addVisit(this.visit).subscribe(
      (data) => {
        this.alertEventService.showSuccessAlert(data.message);
        this.close();
      },
      (err) => {
        console.log(err);
        this.alertEventService.showDangerAlert(err.data.message);
        this.close();
      }
    );
  }

  onSelectUser() {
    super.onSelectUser(this.userSelected);

    this.formVisit = {};
    this.visitSignupService
      .getDisabledDates(this.userSelected.id)
      .subscribe(disabledDates => this.disabledDates = disabledDates);
  }

}

VisitSignupMeController.$inject = ['visitSignupService', 'alertEventService', 'authService', '$state'];

export const VisitSignupMeComponent = {
  bindings: {
    resolve: "<",
    dismiss: "&",
    close: "&"
  },
  template,
  controller: VisitSignupMeController
}