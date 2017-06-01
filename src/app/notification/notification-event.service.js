import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class NotificationEventService {

    constructor() {
        this.loadNotificationSource = new Subject();
        this.loadNotificationObservable = this.loadNotificationSource.asObservable();
    }
   
    loadNotificationEvent() {
        this.loadNotificationSource.next();
    }
   
}