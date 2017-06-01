import "./visit-list.component.scss";
import template from "./visit-list.component.html";
import { Observable } from 'rxjs/Observable';

const VISIT_PAGE_SETTINGS = {
    limit: 10,
    currentPage: 1
}

class VisitListController {
    constructor($filter, authService) {
        this.$filter = $filter;
        this.filter = {};
        this.authService = authService;
        this.selectedVisits = [];
    }

    $onInit() {
        this.pageSettings = Object.assign({}, VISIT_PAGE_SETTINGS);
        this.parent.setLoading(false);
        
        this._updateVisits();
        this.showUpdatingPanel(false);
    }

    onFilterChange(filter) {
        this.filter = filter;
        this._updateVisits();
    }

    renderVisits() {
        this._getFilteredVisits()
             .map((visits) => {
                 this.pageSettings.numPages = Math.ceil(visits.length / this.pageSettings.limit);
                 let offset = (this.pageSettings.currentPage - 1) * this.pageSettings.limit;
                 return visits.slice(offset, offset + this.pageSettings.limit);
             })
             .subscribe((visits) => this.renderedVisits = visits);
    }

    _getFilteredVisits() {
          return Observable.from(this.visits)
                    .filter((vis) => {
                        let fVisit = this.$filter('date')(vis.visitdate, 'dd/MM/yyyy').toString();
                        return !this.filter.date || fVisit.indexOf(this.filter.date) >= 0
                    })
                    .filter((vis) => {
                        let fVisit = this.$filter('date')(vis.visitdate, 'HH:mm').toString();
                        return !this.filter.time || fVisit.indexOf(this.filter.time) >= 0
                    })
                    .filter((vis) => {
                        let name = vis.name + ' ' + vis.surname;
                        return !this.filter.name || name.indexOf(this.filter.name) >= 0
                    })
                    .filter((vis) => (!this.filter.type || this.filter.type === 'all') ? true : vis.status === this.filter.type)
                    .toArray();            
    }

    _filterVisits() {
        this._getFilteredVisits().subscribe((data) => this.filteredVisits = data);
    }
    
    onLimitChange(limit) {
        this.pageSettings.limit = limit;
        this.renderVisits();
    }

    _updateVisits() {
        this._filterVisits();
        this.renderVisits();
    }

    onVisitCanceledByUser(visitId) {
        let index = this.visits.findIndex((visit) => visit.id === visitId);
        
        if(index >= 0) {
            this.visits.splice(index, 1);
            this._updateVisits();
        }
        this.showUpdatingPanel(false);
    }

    onVisitSelected(visitId) {
        for(let i = 0, n = this.visits.length; i < n; i++) {
            if(this.visits[i].id === visitId) {
                let index = this.selectedVisits.findIndex((elem) => elem.id === visitId);
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
                elem.status = status;
                elem.isSelected = false;
            });
            this.selectedVisits = [];
        } else {
            let fVisit = this.visits.find((elem) => elem.id === visit.id)
            if(fVisit) {
                fVisit.status = visit.status;
            }
        }

        this.showUpdatingPanel(false);
    }

    showUpdatingPanel(isUpdating) {
        this.isUpdating = isUpdating;
    }    

}

VisitListController.$inject = ['$filter', 'authService'];


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