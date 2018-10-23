import "./profile.component.scss";
import template from "./profile.component.html";

class ProfileController {
  constructor(profileService, alertEventService, navbarEventService) {
    this.profileService = profileService;
    this.alertEventService = alertEventService;
    this.navbarEventService = navbarEventService;
  }

  updateProfile() {
    this.profileService
      .updateProfile(this.user)
      .subscribe(
        (data) => {
          this.alertEventService.showSuccessAlert(data.message);
          this.navbarEventService.refreshAvatarEvent({ 
            name: `${this.user.surname} ${this.user.name}`, 
            avatar: this.user.avatar 
          });
          this.user.lastEmail = this.user.email;
        },
        (err) => {
          this.alertEventService.showDangerAlert(err.data.message);
          this.user.email = this.user.lastEmail;
        }
      )
  }

  onUploadSuccees(data) {
    this.user.avatar = data.avatar_url;
    this.navbarEventService.refreshAvatarEvent({ 
      name: `${this.user.surname} ${this.user.name}`, 
      avatar: this.user.avatar 
    });
  }

  onUploadFailed(error) {
    this.alertEventService.showDangerAlert(error.data.message);
  }

  $onInit() {
    this.user.lastEmail = this.user.email;
  }
}

ProfileController.$inject = ['profileService', 'alertEventService', 'navbarEventService'];

export const ProfileComponent = {
  bindings: {
    user: "<"
  },
  template: template,
  controller: ProfileController
}