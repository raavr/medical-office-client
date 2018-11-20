import "./navbar-user.component.scss";
import template from "./navbar-user.component.html";

export class NavbarUserController {
  constructor($state) {
    this.$state = $state;
  }

  isActive() {
    const cState = this.$state.is("dashboard.visits.current");
    const pState = this.$state.is("dashboard.visits.past");

    return cState || pState;
  }
}

NavbarUserController.$inject = ['$state'];

export const NavbarUserComponent = {
  template,
  controller: NavbarUserController
}