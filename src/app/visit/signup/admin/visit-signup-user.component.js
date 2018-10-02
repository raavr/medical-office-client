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

    addVisit() {
        this.visitSignupService.addVisit(this.visit).subscribe(
            () => { 
                this.$state.go('visit-browse.current');
                this.alertEventService.showSuccessAlert(`Pacjent ${this.asyncSelectedUser} został zapisany na wizytę.`);
             },
             (err) => { 
                console.log(err);
                this.alertEventService.showDangerAlert(err.data.message);
                this.getAvailableTimes();
             }
        );
    }

    findUsers(userName) {
        return this.visitSignupService
                .findUsers(userName)
                .toPromise();
    }

    isSubmitDisabled() {
        return super.isSubmitDisabled() || this.asyncSelectedUser !== this.userSelected.name;
    }

}

VisitSignupUserController.$inject = ['visitSignupService', 'alertEventService', 'authService', '$state'];

export const VisitSignupUserComponent = {
    bindings: {
        disabledDates: "<"
    },
    template: template,
    controller: VisitSignupUserController
}