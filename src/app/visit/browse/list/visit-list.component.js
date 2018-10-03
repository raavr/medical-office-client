import "./visit-list.component.scss";
import template from "./visit-list.component.html";

const VISIT_PAGE_SETTINGS = {
  limit: 10,
  currentPage: 1
}

class VisitListController {
  constructor(authService, filterService, visitBrowseService, $state) {
    this.authService = authService;
    this.filterService = filterService;
    this.visitBrowseService = visitBrowseService;
    this.$state = $state;

    this.selectedVisits = [];
    this.filters = Object.assign({}, VISIT_PAGE_SETTINGS);
  }

  $onInit() {
    this.parent.setLoading(false);
    this.totalItems = this.visits.totalItems;
    this.visits = this.visits.visits;

    this.showUpdatingPanel(false);
  }

  onFilterChange(filter) {
    this.filters = Object.assign(this.filters, filter);
    this.getVisits();
  }

  onLimitChange(limit) {
    this.filters.limit = limit;
    this.getVisits();
  }

  getVisits() {
    this.showUpdatingPanel(true);
    this.filters = Object.assign(this.filters, { type: this.getVisitType() });

    this.visitBrowseService.getVisits(this.filters)
      .subscribe((visits) => {
        this.visits = visits.visits;
        this.totalItems = visits.totalItems;

        this.showUpdatingPanel(false);
        this.selectedVisits = [];
      });
  }

  onVisitCanceledByUser(visitId) {
    const index = this.visits.findIndex((visit) => visit.id === visitId);
    if (index >= 0) {
      this.visits.splice(index, 1);
    }

    this.showUpdatingPanel(false);
  }

  onVisitSelected(visitId) {
    for (let visit of this.visits) {
      if (visit.id === visitId) {
        const index = this.selectedVisits.findIndex((elem) => elem.id === visitId);
        if (index >= 0) {
          this.selectedVisits.splice(index, 1);
        } else {
          this.selectedVisits.push(visit);
        }
        break;
      }
    }
  }

  onSelectBtnClicked(isSelected) {
    this.selectedVisits = [];

    this.visits.forEach((elem) => {
      elem.isSelected = isSelected;
      if (isSelected) {
        this.selectedVisits.push(elem);
      }
    });
  }

  onVisitsModified(visit) {
    if (visit.id === -1) {
      this.selectedVisits.forEach((elem) => {
        elem.status = visit.status;
        elem.isSelected = false;
        elem.rejectreason = visit.rejectReason;
      });
      this.selectedVisits = [];
    } else {
      const fVisit = this.visits.find((elem) => elem.id === visit.id)
      if (fVisit) {
        fVisit.status = visit.status;
        fVisit.rejectreason = visit.rejectReason;
      }
    }

    this.showUpdatingPanel(false);
  }

  showUpdatingPanel(isUpdating) {
    this.isUpdating = isUpdating;
  }

  getVisitType() {
    return this.$state.current.url.slice(1);
  }

}

VisitListController.$inject = ['authService', 'visitFilterService', 'visitBrowseService', '$state'];


export const VisitListComponent = {
  bindings: {
    visits: "<"
  },
  require: {
    parent: "^visitBrowse"
  },
  template,
  controller: VisitListController
}