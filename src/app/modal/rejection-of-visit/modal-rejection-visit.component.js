import template from './modal-rejection-visit.component.html';

class ModalRejectionVisitCtrl {

    ok() {
        this.close({$value: this.rejectReason});
    }

    cancel() {
        this.dismiss();
    }
}

export const ModalRejectionVisitComponent = {
    bindings: {
        close: '&',
        dismiss: '&'
    },
    template: template,
    controller: ModalRejectionVisitCtrl
}