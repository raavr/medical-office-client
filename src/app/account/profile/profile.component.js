import "./profile.component.scss";
import template from "./profile.component.html";

class ProfileController {
    constructor(profileService, alertEventService) {
        this.profileService = profileService;
        this.alertEventService = alertEventService;
    }

    updateProfile() {
        this.profileService
                .updateProfile(this.user)
                .subscribe(
                    () => { 
                        this.alertEventService.showSuccessAlert("Twój profil został zaktualizowany.");
                        this.user.lastEmail = this.user.email;
                    },
                    (err) => { 
                        this.alertEventService.showDangerAlert("Coś poszło nie tak. Spróbuj ponownie później.");
                        this.user.email = this.user.lastEmail;
                    }
                )
    }

    $onInit() {
        this.user.lastEmail = this.user.email;
    }
}

ProfileController.$inject = ['profileService', 'alertEventService'];

export const ProfileComponent = {
    bindings: {
        user: "<"
    },
    template: template,
    controller: ProfileController
}