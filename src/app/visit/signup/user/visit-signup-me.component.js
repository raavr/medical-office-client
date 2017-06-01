import "./visit-signup-me.component.scss";
import template from "./visit-signup-me.component.html";

class VisitSignupMeController {
    constructor(visitSignupService, $state) {
        this.visitSignupService = visitSignupService;
        this.$state = $state;
    }

    addVisit() {
        let visit = {
            date: this.parent.visit.date,
            time: this.parent.visit.selectedTime.visittime,
            desc: this.parent.visit.desc  
        };
        
        this.visitSignupService.addVisit(visit).subscribe(
            () => { 
                //TODO: 
                //show toast
                this.$state.go('visit-browse.current');
                console.log("Zapisałeś się na wizytę");
             },
             (err) => console.log(err)
        );
    }

    isSubmitDisabled() {
        return !this.parent.visit.date || !this.parent.visit.selectedTime;
    }
}

VisitSignupMeController.$inject = ['visitSignupService', '$state'];

export const VisitSignupMeComponent = {
    bindings: {
        disabledDates: "<"
    },
    require: {
        parent: "^visitSignup"
    },
    template: template,
    controller: VisitSignupMeController
}