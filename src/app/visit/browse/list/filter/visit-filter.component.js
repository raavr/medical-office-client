import './visit-filter.component.scss';
import template from "./visit-filter.component.html";
import { VISIT_STATUS } from '../../../common/visit-status.constant';

class VisitFilterController {
  constructor(authService) {
    this.authService = authService;
    this.filter = {
      status: "all",
      allSelected: false
    };
  }

  selectAll() {
    this.allSelected = !this.allSelected;
    this.onSelectBtnClicked({ allSelected: this.allSelected });
  }

  $onInit() {
    this.assignFilters();
    this.onFilterChange({
      filterChanges: {
        filter: this.filter,
        shouldRefresh: false
      }
    });
  }

  assignFilters() {
    this.filter.userName = this.filterParams && this.filterParams.userName;
    const status = this.filterParams && this.filterParams.status;
    const isStatusValid = Object.values(VISIT_STATUS).some(
      validStatus => validStatus === status
    );
    if (isStatusValid) {
      this.filter.status = status;
    }
  }
}

VisitFilterController.$inject = ['authService'];

export const VisitFilterComponent = {
  bindings: {
    onFilterChange: "&",
    type: "<",
    filterParams: "<",
    onSelectBtnClicked: "&"
  },
  template,
  controller: VisitFilterController
}