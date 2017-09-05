import "./signup.component.scss";
import template from "./signup.component.html";

class SignupCtrl {
    constructor(signupService, alertEventService, $state) {
        this.signupService = signupService;
        this.alertEventService = alertEventService;
        this.$state = $state;
        this.user = {};
    }

    signup() {
        this.signupService
                .signup(this.user)
                .subscribe(
                    () => { 
                        this.alertEventService.showSuccessAlert("Poprawnie założono konto. Możesz się teraz zalogować.");
                        this.$state.go('login');
                    },
                    (err) => {
                        this.alertEventService.showDangerAlert(err.data.message);
                    }
                );
    }

}

SignupCtrl.$inject = ['signupService', 'alertEventService', '$state'];

export const SignupComponent = {
    template: template,
    controller: SignupCtrl
}

