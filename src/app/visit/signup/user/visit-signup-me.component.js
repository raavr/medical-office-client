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

  addVisit() {
    this.visitSignupService.addVisit(this.visit).subscribe(
      () => {
        this.$state.go('visit-browse.current');
        this.alertEventService.showSuccessAlert(data.message);
      },
      (err) => {
        console.log(err);
        this.alertEventService.showDangerAlert(err.data.message);
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
    doctorsList: "<"
  },
  template,
  controller: VisitSignupMeController
}