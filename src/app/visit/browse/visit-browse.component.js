import "./visit-browse.component.scss";
import template from "./visit-browse.component.html";

class VisitBrowseController {
    constructor($state, authService) {
        this.$state = $state;
        this.authService = authService;
    }

    $onInit() {
        if(this._isCurrentTabStateActive()) {
            this._setActivatedTab('current');
        } else {
            this._setActivatedTab('past');
        }
    }

    activeTab(tabName) {
        if(!this.isTabActive(tabName)) {
            this.setLoading(true);
        }
        this._setActivatedTab(tabName);
    }

    _setActivatedTab(tabName) {
        this.activatedTab = tabName;
    }

    _isCurrentTabStateActive() {
        return this.$state.is("visit-browse.current") || this.$state.is("visit-browse.admin-current");
    }

    isTabActive(tabName) {
        return this.activatedTab === tabName;
    }
    
    setLoading(value) {
        this.loading = value;
    }
    
    isLoading() {
        return this.loading;
    }
}

VisitBrowseController.$inject = ['$state', 'authService'];

export const VisitBrowseComponent = {
    template: template,
    controller: VisitBrowseController
}