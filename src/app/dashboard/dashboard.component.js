import template from './dashboard.component.html';

class DashboardController {
  constructor(authService) {
    this.authService = authService;
  }
}

DashboardController.$inject = ['authService'];

export const DashboardComponent = {
  template,
  controller: DashboardController
}