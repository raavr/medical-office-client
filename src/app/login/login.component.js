import "./login.component.scss";
import template from "./login.component.html";

class LoginCtrl {
    constructor(authService, $location) {
        this.authService = authService;
        this.$location = $location;
        this.user = {};
    }

    login() {
        this.authService
                .login({ email: this.user.email, password: this.user.password })
                .subscribe(
                    () => this.$location.path("/"),
                    (err) => console.log(err.data.message)
                );
    }

}

LoginCtrl.$inject = ['authService', '$location'];

export const LoginComponent = {
    template: template,
    controller: LoginCtrl
}

