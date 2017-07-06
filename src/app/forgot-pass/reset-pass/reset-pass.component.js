import "./reset-pass.component.scss";
import template from "./reset-pass.component.html";
import { Observable } from 'rxjs/Observable';

class ResetPassController {
    constructor(resetPassService, alertEventService, $scope) {
        this.resetPassService = resetPassService;
        this.alertEventService = alertEventService;
        this.$scope = $scope;
    }

    resetPass() {
        this.resetPassService
            .resetPassword({email: this.email})
            .subscribe(
                (message) => {
                    this.alertEventService.showSuccessAlert(message); 
                    this.resetForm();
                },
                () => {
                    this.alertEventService.showDangerAlert('Coś poszło nie tak. Prośba o zmianę hasła nie została przyjęta.');
                }
            );
    }

    resetForm() {
        this.$scope.resetPassForm.$setPristine();
        this.email = '';
    }

}

ResetPassController.$inject = ['resetPassService', 'alertEventService', '$scope'];

export const ResetPassComponent = {
    template: template,
    controller: ResetPassController
}