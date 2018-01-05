import "./visit-list.component.scss";
import template from "./visit-list.component.html";
import { Observable } from 'rxjs/Observable';

const VISIT_PAGE_SETTINGS = {
    limit: 10,
    currentPage: 1
}

class VisitListController {
    constructor(authService, filterService) {
        this.authService = authService;
        this.filterService = filterService;

        this.selectedVisits = [];
        this.filters = Object.assign({}, VISIT_PAGE_SETTINGS);
    }

    $onInit() {
        this.parent.setLoading(false);
   
        this._prepareVisits();
        this.showUpdatingPanel(false);
    }
    
    _applyFilters() {
        this.filterService
        .applyFilters(this.visits, this.filters)
        .subscribe((data) => this.filteredVisits = data);
    }

    applyLimitAndOffset() {
        this.filterService
        .applyLimitAndOffset(this.filteredVisits, this.filters)
        .subscribe((visits) => this.currentVisibleVisits = visits);
    }
    
    onFilterChange(filter) {
        this.filters = Object.assign(this.filters, filter);
        this._prepareVisits();
    }

    onLimitChange(limit) {
        this.filters.limit = limit;
        this.applyLimitAndOffset();
    }

    _prepareVisits() {
        this._applyFilters();
        this.applyLimitAndOffset();
    }

    onVisitCanceledByUser(visitId) {
        const index = this.visits.findIndex((visit) => visit.id === visitId);
        
        if(index >= 0) {
            this.visits.splice(index, 1);
            this._prepareVisits();
        }
        this.showUpdatingPanel(false);
    }

    onVisitSelected(visitId) {
        for(let i = 0, n = this.visits.length; i < n; i++) {
            if(this.visits[i].id === visitId) {
                const index = this.selectedVisits.findIndex((elem) => elem.id === visitId);
                if(index >= 0) {
                    this.selectedVisits.splice(index, 1);
                } else {
                    this.selectedVisits.push(this.visits[i]);
                }
                break;
            }    
        }
    }

    onSelectBtnClicked(isSelected) {
        this.selectedVisits = [];

        this.filteredVisits.forEach((elem) => { 
            elem.isSelected = isSelected;
            if(isSelected) {
                this.selectedVisits.push(elem);
            }
        });
    }

    onVisitsModified(visit) {
        if(visit.id === -1) {
            this.selectedVisits.forEach((elem) => {
                elem.status = visit.type;
                elem.isSelected = false;
                elem.rejectreason = visit.rejectReason;
            });
            this.selectedVisits = [];
        } else {
            const fVisit = this.visits.find((elem) => elem.id === visit.id)
            if(fVisit) {
                fVisit.status = visit.type;
                fVisit.rejectreason = visit.rejectReason;
            }
        }

        this.showUpdatingPanel(false);
    }

    showUpdatingPanel(isUpdating) {
        this.isUpdating = isUpdating;
    }    

}

VisitListController.$inject = ['authService', 'visitFilterService'];


export const VisitListComponent = {
    bindings: {
        visits: "<",
        type: "<"
    },
    require: {
        parent: "^visitBrowse"
    },
    template: template,
    controller: VisitListController
}