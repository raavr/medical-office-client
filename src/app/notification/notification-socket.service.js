import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import socketIo from 'socket.io-client';
import { CONFIG } from '../app.constant';
import { AUTH_CONFIG } from '../auth/auth.constant';

export class NotificationSocketService {

  constructor(notificationEventService) {
    this.notificationEventService = notificationEventService;
  }

  init() {
    if (!this.socket) {
      this.socket = socketIo(CONFIG.WS_ENDPOINT);
    }
    this.setEvents();
    this.socket.emit('join', localStorage.getItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME));
  }

  setEvents() {
    this.socket.on('count', (count) => 
      this.notificationEventService.refreshNotificationCount(count)
    );
    this.socket.on('exception', () => this.disconnect());
  }

  onEvent(event) {
    return new Observable(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

NotificationSocketService.$inject = ['notificationEventService'];