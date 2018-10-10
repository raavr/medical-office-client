import "./login.component.scss";
import template from "./login.component.html";
import { AUTH_CONFIG } from '../auth/auth.constant';

class LoginCtrl {
  constructor(authService, $location, alertEventService, notificationSocketService) {
    this.authService = authService;
    this.$location = $location;
    this.alertEventService = alertEventService;
    this.notificationSocketService = notificationSocketService;
    this.user = {};
  }

  login() {
    this.authService
      .login({ email: this.user.email, password: this.user.password })
      .subscribe(
        () => {
          this.$location.path("/");
          this.notificationSocketService.init();
          this.alertEventService.showSuccessAlert("Aplikacja jest w wersji demonstracyjnej, wszystkie wprowadzone przez Ciebie zmiany zostaną po pewnym czasie usunięte.");
        },
        (err) => {
          this.alertEventService.showDangerAlert(err.data.message);
        }
      );
  }

}

LoginCtrl.$inject = ['authService', '$location', 'alertEventService', 'notificationSocketService'];

export const LoginComponent = {
  template,
  controller: LoginCtrl
}

