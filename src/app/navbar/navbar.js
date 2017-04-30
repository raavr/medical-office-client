import CollapseNavbarDirective from './collapse-navbar.directive';
import { NavbarComponent } from './navbar.component';
import Auth from '../auth/auth';

export default angular.module("navbar", [ Auth ])
                      .directive("collapseNavbar", CollapseNavbarDirective)
                      .component("navbar", NavbarComponent)
                      .name;