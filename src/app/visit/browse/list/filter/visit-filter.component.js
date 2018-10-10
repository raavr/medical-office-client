import './visit-filter.component.scss';
import template from "./visit-filter.component.html";
import { VISIT_STATUS } from '../../../common/visit-status.constant';

class VisitFilterController {
  constructor(authService) {
    this.authService = authService;
    this.filter = {
      status: "all"
    };
  }

  $onInit() {
    if(Object.values(VISIT_STATUS).some((status) => status === this.status)) {
      this.filter.status = this.status;
    }
  }
}

VisitFilterController.$inject = ['authService'];

export const VisitFilterComponent = {
  bindings: {
    onFilterChange: "&",
    type: "<",
    status: "<"
  },
  template,
  controller: VisitFilterController
}