import template from "./visit-signup.component.html";
import { transformDate } from '../../app.helper';

class VisitSignupController {
    
    constructor(visitSignupService) {
        this.visitSignupService = visitSignupService;
        this.visit = {};
    }

    changeDate(event) {
        this.visit.date = transformDate(event.date);
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