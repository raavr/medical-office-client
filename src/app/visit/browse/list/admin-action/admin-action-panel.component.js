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
                        .subscribe((ntf) => {
                            this.selectedVisits = [ntf];
                            if(ntf.type === NOTF_TYPE.ACCEPT) {
                                this.acceptSelectedVisits(ntf.id);
                            } else {
                                this.cancelSelectedVisits(ntf.id);
                            }
                        })
    }
    
    acceptSelectedVisits(id = -1) {
        this.isUpdating({isUpdating: true});
        this.adminActionService
                .acceptVisits(this.selectedVisits.map((elem) => elem.id))
                .subscribe(
                    () => {
                        this.alertEventService.showSuccessAlert('Wizyty zostały zaakceptowane.');
                        this.onVisitsUpdated(
                            { 
                                visit: {
                                    status: 'accepted',
                                    id: id
                                }
                            }
                        );
                        this.notificationEventService.refreshNotificationCount();
                    },
                    (err) => { 
                        console.log(err);
                        this.isUpdating({isUpdating: false});
                    }
                );       
        
    }

    cancelSelectedVisits(id = -1) {
        this.isUpdating({isUpdating: true});
        this.adminActionService
            .rejectVisits(this.selectedVisits.map((elem) => elem.id), "Powodu brak")
            .subscribe(
                () => {
                     this.alertEventService.showSuccessAlert('Wizyty zostały odrzucone.');
                     this.onVisitsUpdated(
                        { 
                            visit: {
                                status: 'canceled',
                                id: id
                            }
                        }
                    );
                    this.notificationEventService.refreshNotificationCount();
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