import template from "./visit-signup.component.html";
import { toDate_mmddyyyy } from '../../app.helper';

class VisitSignupController {
    
    constructor(visitSignupService) {
        this.visitSignupService = visitSignupService;
        this.visit = {};
    }

    changeDate(event) {
        this.visit.date = toDate_mmddyyyy(event.date);
        this.getAvailableTimes();
    }      

    getAvailableTimes() {
        this.visitSignupService
                .getAvailableTimes(this.visit.date)
                .subscribe(
                    (time) => this.visit.times = time,
                    (err) => console.log(err.data)
                );
    }
    
}

VisitSignupController.$inject = ['visitSignupService'];

export const VisitSignupComponent = {
    template: template,
    controller: VisitSignupController
}