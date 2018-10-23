import "./navbar-account.component.scss";
import template from "./navbar-account.component.html";

class NavbarAccountController {
  constructor(authService, $location, notificationSocketService) {
    this.authService = authService;
    this.$location = $location;
    this.notificationSocketService = notificationSocketService;
  }

  logout() {
    this.authService.logout()
      .subscribe(() => {
        this.$location.path("/");
        this.notificationSocketService.disconnect();
      });
  }
}

NavbarAccountController.$inject = ['authService', '$location', 'notificationSocketService'];

export const NavbarAccountComponent = {
  bindings: {
    user: "<"
  },
  template,
  controller: NavbarAccountController
}