import template from "./visit-signup-user.component.html";

class VisitSignupUserController {
    constructor(visitSignupService, $state, alertEventService) {
        this.visitSignupService = visitSignupService;
        this.$state = $state;
        this.userSelected = {};
        this.alertEventService = alertEventService;
    }

    addVisit() {
        const visit = {
            date: this.parent.visit.date,
            time: this.parent.visit.selectedTime.visittime,
            desc: this.parent.visit.desc,
            userid: this.userSelected.id  
        };
        
        this.visitSignupService.addVisit(visit).subscribe(
            () => { 
                this.$state.go('visit-browse.admin-current');
                this.alertEventService.showSuccessAlert(`Pacjent ${this.asyncSelectedUser} został zapisany na wizytę.`);
             },
             (err) => { 
                console.log(err);
                this.parent.getAvailableTimes();
             }
        );
    }

    findUsers(userName) {
        return this.visitSignupService
                .findUsers(userName)
                .toPromise();
    }

    onSelectUser(item) {
        this.userSelected.id = item.id;
        this.userSelected.name = item.sn;
    }

    isSubmitDisabled() {
        return !this.parent.visit.date 
               || !this.parent.visit.selectedTime 
               || !this.userSelected.name 
               || this.asyncSelectedUser !== this.userSelected.name;
    }

}

VisitSignupUserController.$inject = ['visitSignupService', '$state', 'alertEventService'];

export const VisitSignupUserComponent = {
    bindings: {
        disabledDates: "<"
    },
    require: {
        parent: "^visitSignup"
    },
    template: template,
    controller: VisitSignupUserController
}