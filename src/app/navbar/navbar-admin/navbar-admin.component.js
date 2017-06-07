import "./navbar-admin.component.scss";
import template from "./navbar-admin.component.html";

class NavbarAdminController {
    constructor($state) {
        this.$state = $state;
    }

    isActive() {
        let cState = this.$state.is("visit-browse.admin-current"),
            pState = this.$state.is("visit-browse.admin-past");

        return cState || pState;
    }
}

NavbarAdminController.$inject = ['$state'];

export const NavbarAdminComponent = {
    template: template,
    controller: NavbarAdminController
}