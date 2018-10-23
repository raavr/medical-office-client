import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import socketIo from 'socket.io-client';
import { CONFIG } from '../app.constant';
import { AUTH_CONFIG } from '../auth/auth.constant';

export class NotificationSocketService {

  constructor(notificationEventService, navbarEventService) {
    this.notificationEventService = notificationEventService;
    this.navbarEventService = navbarEventService;
  }

  init() {
    if (!this.socket) {
      this.socket = socketIo(CONFIG.WS_ENDPOINT);
    }
    this.setEvents();
    this.runEvents();
  }

  setEvents() {
    this.socket.on('count', (count) => 
      this.notificationEventService.refreshNotificationCount(count)
    );
    this.socket.on('avatar', (user) => this.navbarEventService.refreshAvatarEvent(user));
    this.socket.on('exception', () => this.disconnect());
  }

  runEvents() {
    ['join', 'avatar'].forEach(channel => this.socket.emit(channel, localStorage.getItem(AUTH_CONFIG.DEFAULT_TOKEN_NAME)));
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

NotificationSocketService.$inject = ['notificationEventService', 'navbarEventService'];