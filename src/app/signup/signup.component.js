import "./signup.component.scss";
import template from "./signup.component.html";

class SignupCtrl {
    constructor(signupService, alertEventService) {
        this.signupService = signupService;
        this.alertEventService = alertEventService;
        this.user = {};
    }

    signup() {
        this.signupService
                .signup(this.user)
                .subscribe(
                    () => { 
                        this.alertEventService.showSuccessAlert("Poprawnie założono konto. Możesz się teraz zalogować.");
                    },
                    (err) => {
                        this.alertEventService.showDangerAlert(err.data.message);
                    }
                );
    }

}

SignupCtrl.$inject = ['signupService', 'alertEventService'];

export const SignupComponent = {
    template: template,
    controller: SignupCtrl
}

