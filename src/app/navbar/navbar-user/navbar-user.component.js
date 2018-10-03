import "./navbar-user.component.scss";
import template from "./navbar-user.component.html";

export class NavbarUserController {
  constructor($state) {
    this.$state = $state;
  }

  isActive() {
    const cState = this.$state.is("visit-browse.current");
    const pState = this.$state.is("visit-browse.past");

    return cState || pState;
  }
}

NavbarUserController.$inject = ['$state'];

export const NavbarUserComponent = {
  template,
  controller: NavbarUserController
}