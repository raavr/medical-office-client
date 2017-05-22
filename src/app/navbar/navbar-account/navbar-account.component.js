import "./navbar-account.component.scss";
import template from "./navbar-account.component.html";

class NavbarAccountController {
    constructor(authService, $location) {
        this.authService = authService;
        this.$location = $location;
    }

    logout() {
        this.authService.logout().subscribe(() => this.$location.path("/"));
    }
}

NavbarAccountController.$inject = ['authService', '$location'];

export const NavbarAccountComponent = {
    template: template,
    controller: NavbarAccountController
}