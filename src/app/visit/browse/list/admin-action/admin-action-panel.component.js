import './admin-action-panel.component.scss';
import template from "./admin-action-panel.component.html";
import { NOTF_TYPE } from '../../../../notification/menu/admin/notification-type.enum';

class AdminActionPanelController {

    constructor(adminActionService, notificationEventService, alertEventService) {
        this.adminActionService = adminActionService;
        this.notificationEventService = notificationEventService;
        this.alertEventService = alertEventService;
    }

    $onInit() {
        this.notificationEventSubscription = 
                    this.notificationEventService
                        .updateVisitStatusObservable
                        .subscribe((ntf) => this._onSuccess(ntf));
    }
    
    acceptSelectedVisits(id = -1) {
        this.isUpdating({isUpdating: true});
        this.adminActionService
                .acceptVisits(this.selectedVisits.map((elem) => elem.id))
                .subscribe(
                    () => {
                        this._onSuccess({type: NOTF_TYPE.ACCEPT, id: id});
                    },
                    (err) => { 
                        console.log(err);
                        this.isUpdating({isUpdating: false});
                    }
                );       
        
    }

    _onSuccess(ntf) {
        this.alertEventService.showSuccessAlert(
            ntf.type === NOTF_TYPE.ACCEPT ? 'Wizyty zostały zaakceptowane.' : 'Wizyty zostały odrzucone.'
        );
        this.onVisitsUpdated({ visit: ntf});
        this.notificationEventService.refreshNotificationCount();
    }

    cancelSelectedVisits(id = -1) {
        this.isUpdating({isUpdating: true});
        this.adminActionService
            .rejectVisits(this.selectedVisits.map((elem) => elem.id), "Powodu brak")
            .subscribe(
                () => {
                     this._onSuccess({type: NOTF_TYPE.CANCEL, id: id});
                },
                (err) => {
                    console.log(err);
                    this.isUpdating({isUpdating: false});
                }
            );       
    }

    $onDestroy() {
        this.notificationEventSubscription.unsubscribe();
    }
}

AdminActionPanelController.$inject = ['adminActionService', 'notificationEventService', 'alertEventService'];


export const AdminActionPanelComponent = {
    bindings: {
        selectedVisits: "<",
        onVisitsUpdated: "&",
        isUpdating: "&"
    },
    template: template,
    controller: AdminActionPanelController
}