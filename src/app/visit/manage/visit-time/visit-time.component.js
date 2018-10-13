import "./visit-time.component.scss";
import template from "./visit-time.component.html";

class VisitTimeController {

  constructor($filter) {
    this.$filter = $filter;
  }

  $onInit() {
    this.currentTime = new Date().setHours(8, 0);
    this.visitTimesSet = new Set(this.times);
  }

  addTime() {
    const timeStr = this.$filter('date')(this.currentTime, 'HH:mm').toString();
    this.visitTimesSet.add(timeStr);
    this._makeListFromSet();
  }

  removeTime(time) {
    this.visitTimesSet.delete(time);
    this._makeListFromSet()
  }

  _makeListFromSet() {
    this.times = [...this.visitTimesSet].sort();
  }

}

VisitTimeController.$inject = ['$filter'];

export const VisitTimeComponent = {
  bindings: {
    times: "<",
    update: "&"
  },
  template,
  controller: VisitTimeController
}