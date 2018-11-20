import template from "./visit-signup-btn.component.html";
import "./visit-signup-btn.component.scss";
import VisitSignupUserResolve from "../doctor/visit-signup-user.resolver";
import VisitSignupMeResolve from "../user/visit-signup-me.resolver";

class VisitSignupBtnController {

  constructor(authService, $uibModal) {
    this.authService = authService;
    this.$uibModal = $uibModal;
  }

  openSignupModal() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      component: this.authService.isDoctor()
        ? 'visitSignupUser'
        : 'visitSignupMe',
      resolve: {
        doctorsList: !this.authService.isDoctor() && VisitSignupMeResolve,
        disabledDates: this.authService.isDoctor() && VisitSignupUserResolve
      }
    });

    modalInstance.result
      .then(this.refreshVisit)
      .catch(() => {});
  }
}

VisitSignupBtnController.$inject = ['authService', '$uibModal'];

export const VisitSignupBtnComponent = {
  bindings: {
    refreshVisit: "&"
  },
  template,
  controller: VisitSignupBtnController
}