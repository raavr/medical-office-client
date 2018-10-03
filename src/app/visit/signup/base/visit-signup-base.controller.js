import { toDate_ddmmyyyy } from '../../../app.helper';

export class VisitSignupBaseController {
  constructor() {
    this.formVisit = {};
    this.userSelected = {};
  }

  onSelectUser(item) {
    this.userSelected.id = item.id;
    this.userSelected.name = item.name;
  }

  changeDate(event) {
    this.formVisit.date = toDate_ddmmyyyy(event.date);
    this.getAvailableTimes();
  }

  getAvailableTimes() {
    const userId = this.authService.isAdmin() ? null : this.userSelected.id;
    if (userId !== undefined) {
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
      time: this.formVisit.selectedTime.visitTime,
      desc: this.formVisit.desc,
      userId: this.userSelected.id
    }
  }
}