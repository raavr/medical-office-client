import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class NotificationEventService {

  constructor() {
    this.loadNotificationSource = new Subject();
    this.loadNotification$ = this.loadNotificationSource.asObservable();

    this.updateVisitStatusSource = new Subject();
    this.updateVisitStatus$ = this.updateVisitStatusSource.asObservable();

    this.refreshNotificationCountSource = new Subject();
    this.refreshNotificationCount$ = this.refreshNotificationCountSource.asObservable();

    this.hideNotificationMenuSource = new Subject();
    this.hideNotificationMenuSource$ = this.hideNotificationMenuSource.asObservable();
  }

  loadNotificationEvent() {
    this.loadNotificationSource.next();
  }

  updateVisitStatusEvent(ntf) {
    this.updateVisitStatusSource.next(ntf);
  }

  refreshNotificationCount(count) {
    this.refreshNotificationCountSource.next(count);
  }

  hideNotificationMenu() {
    this.hideNotificationMenuSource.next();
  }

}