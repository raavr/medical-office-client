import "./account-password.component.scss";
import template from "./account-password.component.html";

class AccountPasswordController {
    constructor(accountPasswordService, alertEventService, scope) {
        this.accountPasswordService = accountPasswordService;
        this.alertEventService = alertEventService;
        this.scope = scope;
        this.user = {};
    }

    changePassword() {
        this.accountPasswordService
            .changePassword(this.user)
            .subscribe(
                () => { 
                    this.alertEventService.showSuccessAlert("Twoje hasło zostało zmienione.");
                    this._clearForm();
                },
                (err) => { 
                    this.alertEventService.showDangerAlert(err.data.message);
                }
            );
    }

    $onInit() {
        this.user.email = this.email; 
    }

    _clearForm() {
        this.user = {
            email: this.email
        };
        this.scope.changePassForm.$setPristine();
    }

}

AccountPasswordController.$inject = ['accountPasswordService', 'alertEventService', '$scope'];

export const AccountPasswordComponent = {
    bindings: {
        email: "<"
    },
    template: template,
    controller: AccountPasswordController
}