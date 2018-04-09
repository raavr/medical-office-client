import "./visit-list.component.scss";
import template from "./visit-list.component.html";
import { Observable } from 'rxjs/Observable';

const VISIT_PAGE_SETTINGS = {
    limit: 10,
    currentPage: 1
}

class VisitListController {
    constructor(authService, filterService, visitBrowseService) {
        this.authService = authService;
        this.filterService = filterService;
        this.visitBrowseService = visitBrowseService;

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

        const getVisitsSubscription = (visits) => {
            this.visits = visits.visits; 
            this.totalItems = visits.totalItems;
            
            this.showUpdatingPanel(false);
            this.selectedVisits = [];
        }

        switch(this.type) {
            case "user_past":
                this.visitBrowseService.getPastUsersVisits(this.filters).subscribe(getVisitsSubscription);
                break;
            case "user_current":
                this.visitBrowseService.getUsersVisits(this.filters).subscribe(getVisitsSubscription);            
                break;
            case "admin_past":
                this.visitBrowseService.getPastAdminVisits(this.filters).subscribe(getVisitsSubscription);
                break;
            case "admin_current":
                this.visitBrowseService.getAdminVisits(this.filters).subscribe(getVisitsSubscription);
                break;
        }
    }

    onVisitCanceledByUser(visitId) {
        const index = this.visits.findIndex((visit) => visit.id === visitId);
        
        if(index >= 0) {
            this.visits.splice(index, 1);
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

        this.visits.forEach((elem) => { 
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

VisitListController.$inject = ['authService', 'visitFilterService', 'visitBrowseService'];


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