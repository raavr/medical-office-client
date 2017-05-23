import "./visit-signup-me.component.scss";
import template from "./visit-signup-me.component.html";

class VisitSignupMeController {
    constructor(visitService) {
        this.visitService = visitService;
    }

    addVisit() {
        let visit = {
            date: this.parent.visit.date,
            time: this.parent.visit.selectedTime.visittime,
            desc: this.parent.visit.desc  
        };
        
        this.visitService.addVisit(visit).subscribe(
            () => { 
                //TODO: 
                //redirect to browse visit url
                //show toast
                console.log("Zapisałeś się na wizytę");
             },
             (err) => console.log(err)
        );
    }

    isSubmitDisabled() {
        return !this.parent.visit.date || !this.parent.visit.selectedTime;
    }
}

VisitSignupMeController.$inject = ['visitService'];

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