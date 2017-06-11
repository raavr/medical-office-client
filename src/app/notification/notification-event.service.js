import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class NotificationEventService {

    constructor() {
        this.loadNotificationSource = new Subject();
        this.loadNotificationObservable = this.loadNotificationSource.asObservable();

        this.updateVisitStatusSource = new Subject();
        this.updateVisitStatusObservable = this.updateVisitStatusSource.asObservable();

        this.refreshNotificationCountSource = new Subject();
        this.refreshNotificationCountObservable = this.refreshNotificationCountSource.asObservable();

        this.hideNotificationMenuSource = new Subject();
        this.hideNotificationMenuSourceObservable = this.hideNotificationMenuSource.asObservable();
    }
   
    loadNotificationEvent() {
        this.loadNotificationSource.next();
    }

    updateVisitStatusEvent(ntf) {
        this.updateVisitStatusSource.next(ntf);
    }

    refreshNotificationCount() {
        this.refreshNotificationCountSource.next();
    }

    hideNotificationMenu() {
        this.hideNotificationMenuSource.next();
    }
   
}