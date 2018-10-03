import "./day-of-week.component.scss";
import template from "./day-of-week.component.html";

class DayOfWeekController {

  setSelected(checked) {
    const arr = this.visitTime.visitTime;
    arr.forEach((elem) => elem.selected = checked);
  }

}

export const DayOfWeekComponent = {
  bindings: {
    visitTime: "<"
  },
  template,
  controller: DayOfWeekController
}