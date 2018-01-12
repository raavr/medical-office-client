import { toDate_mmddyyyy } from '../../../app.helper';

export class VisitSignupBaseController {
    constructor() {
        this.formVisit = {};
        this.userSelected = {};
    }

    onSelectUser(item) {
        this.userSelected.id = item.id;
        this.userSelected.name = item.sn;
    }

    changeDate(event) {
        this.formVisit.date = toDate_mmddyyyy(event.date);
        this.getAvailableTimes();
    }      

    getAvailableTimes() {
        const userId = this.authService.isAdmin() ? null : this.userSelected.id;
        if(userId !== undefined) { 
            this.visitSignupService
                    .getAvailableTimes(this.formVisit.date, userId)
                    .subscribe(
                        (time) => this.formVisit.times = time,
                        (err) => console.log(err.data)
                    );
        }
    }

    isSubmitDisabled() {
        return !this.formVisit.date 
               || !this.formVisit.selectedTime 
               || !this.userSelected.name;
    }

    get visit() {
        return {
            date: this.formVisit.date,
            time: this.formVisit.selectedTime.visittime,
            desc: this.formVisit.desc,
            userid: this.userSelected.id  
        }
    }
}