import template from './visit-more-info.component.html';
import "./visit-more-info.component.scss";

class ModalVisitMoreInfoCtrl {

  constructor(authService) {
    this.authService = authService;
  }

  $onInit() {
    this.visit = this.resolve.visit;
  }

  ok() {
    this.close();
  }
}

ModalVisitMoreInfoCtrl.$inject = ['authService'];

export const ModalVisitMoreInfoComponent = {
  bindings: {
    resolve: '<',
    close: '&'
  },
  template,
  controller: ModalVisitMoreInfoCtrl
}