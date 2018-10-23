import "./navbar.component.scss";
import template from "./navbar.component.html";
import { CONFIG } from '../app.constant';
import { Observable } from 'rxjs/Observable';

class NavbarController {
  constructor(authService, navbarEventService) {
    this.authService = authService;
    this.navbarEventService = navbarEventService;
  }

  $onInit() {
    this.navbarEventService
      .refreshAvatar$
      .subscribe(user => this.user = user);
    }
}

NavbarController.$inject = ['authService', 'navbarEventService'];

export const NavbarComponent = {
  template,
  controller: NavbarController
}