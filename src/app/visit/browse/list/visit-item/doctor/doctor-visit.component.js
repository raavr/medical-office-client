import "./doctor-visit.component.scss";
import template from "./doctor-visit.component.html";

class DoctorVisitController {
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  toggleSelection() {
    this.onChange({
      visitId: this.visit.id
    });
  }

  showMore() {
    const modalInstance = this.$uibModal.open({
      animation: true,
      component: 'modalVisitMoreInfo',
      resolve: {
        visit: () => this.visit
      }
    });

    modalInstance.result.catch(() => { });
  }
}

DoctorVisitController.$inject = ['$uibModal'];


export const DoctorVisitComponent = {
  bindings: {
    visit: "<",
    type: "<",
    isEven: "<",
    onChange: "&"
  },
  template,
  controller: DoctorVisitController
}