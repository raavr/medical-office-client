import "./login.component.scss";
import template from "./login.component.html";

class LoginCtrl {
    constructor(authService, $location, alertEventService) {
        this.authService = authService;
        this.$location = $location;
        this.alertEventService = alertEventService;
        this.user = {};
    }

    login() {
        this.authService
                .login({ email: this.user.email, password: this.user.password })
                .subscribe(
                    () => this.$location.path("/"),
                    (err) => {
                        this.alertEventService.showDangerAlert(err.data.message);
                    }
                );
    }

}

LoginCtrl.$inject = ['authService', '$location', 'alertEventService'];

export const LoginComponent = {
    template: template,
    controller: LoginCtrl
}

