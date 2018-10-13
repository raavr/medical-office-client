import "./disabled-date.component.scss";
import template from "./disabled-date.component.html";
import { toDate_ddmmyyyy, isDateValid } from '../../../app.helper';

class DisabledDateController {

  changeDate(event) {
    this.currentDate = toDate_ddmmyyyy(event.date);
  }

  $onInit() {
    this.disabledDatesSet = new Set(this.disabledDates);
  }

  addDate() {
    if(!this.currentDate) {
      return;
    }
    this.disabledDatesSet.add(this.currentDate);
    this._makeListFromSet();
  }

  removeDate(date) {
    this.disabledDatesSet.delete(date);
    this._makeListFromSet()
  }

  _makeListFromSet() {
    this.disabledDates = [...this.disabledDatesSet].sort((a, b) => {
      const aDate = a.split('/');
      const bDate = b.split('/');
      const diffY = +aDate[2] - +bDate[2]; 
      const diffM = +aDate[1] - +bDate[1];
      const diffD = +aDate[0] - +bDate[0];
      return diffY !== 0
        ? diffY
        : diffM !== 0 
          ? diffM
          : diffD
    });
  }

}

export const DisabledDateComponent = {
  bindings: {
    disabledDates: "<",
    update: "&"
  },
  template,
  controller: DisabledDateController
}