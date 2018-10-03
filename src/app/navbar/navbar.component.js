import "./navbar.component.scss";
import template from "./navbar.component.html";
import { CONFIG } from '../app.constant';
import { Observable } from 'rxjs/Observable';

class NavbarController {
  constructor(authService) {
    this.authService = authService;
  }
}

NavbarController.$inject = ['authService'];

export const NavbarComponent = {
  template,
  controller: NavbarController
}