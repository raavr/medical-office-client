import template from "./visit-signup.component.html";
import { transformDate } from '../../app.helper';

class VisitSignupController {
    
    constructor(visitService) {
        this.visitService = visitService;
        this.visit = {};
    }

    changeDate(event) {
        this.visit.date = transformDate(event.date);
        this.getAvailableTimes();
    }      

    getAvailableTimes() {
        this.visitService
                .getAvailableTimes(this.visit.date)
                .subscribe(
                    (time) => this.visit.times = time,
                    (err) => console.log(err.data)
                );
    }
    
}

VisitSignupController.$inject = ['visitService'];

export const VisitSignupComponent = {
    template: template,
    controller: VisitSignupController
}