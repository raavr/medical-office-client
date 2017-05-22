import CollapseNavbarDirective from './collapse-navbar.directive';
import { NavbarComponent } from './navbar.component';
import Auth from '../auth/auth';
import { NavbarSignComponent } from './navbar-sign/navbar-sign.component';
import { NavbarAccountComponent } from './navbar-account/navbar-account.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import Notification from '../notification/notification';

export default angular.module("navbar", [ Auth, Notification ])
                      .directive("collapseNavbar", CollapseNavbarDirective)
                      .component("navbar", NavbarComponent)
                      .component("navbarSign", NavbarSignComponent)
                      .component("navbarAccount", NavbarAccountComponent)
                      .component("navbarAdmin", NavbarAdminComponent)
                      .component("navbarUser", NavbarUserComponent)
                      .name;