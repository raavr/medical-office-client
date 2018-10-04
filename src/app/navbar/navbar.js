import CollapseNavbarDirective from './collapse-navbar.directive';
import { NavbarComponent } from './navbar.component';
import Auth from '../auth/auth';
import { NavbarSignComponent } from './navbar-sign/navbar-sign.component';
import { NavbarAccountComponent } from './navbar-account/navbar-account.component';
import { NavbarDoctorComponent } from './navbar-doctor/navbar-doctor.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import Notification from '../notification/notification';
import { SmoothScrollDirective } from './smooth-scroll.directive';

export default
  angular.module("navbar", [Auth, Notification])
    .directive("collapseNavbar", CollapseNavbarDirective)
    .directive("smoothScroll", SmoothScrollDirective)
    .component("navbar", NavbarComponent)
    .component("navbarSign", NavbarSignComponent)
    .component("navbarAccount", NavbarAccountComponent)
    .component("navbarDoctor", NavbarDoctorComponent)
    .component("navbarUser", NavbarUserComponent)
    .name;