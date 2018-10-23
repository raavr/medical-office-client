import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class NavbarEventService {

  constructor() {
    this.refreshAvatarSource = new Subject();
    this.refreshAvatar$ = this.refreshAvatarSource.asObservable();
  }

  refreshAvatarEvent(user) {
    this.refreshAvatarSource.next(user);
  }

}