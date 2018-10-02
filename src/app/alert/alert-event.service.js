import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class AlertEventService {

  constructor() {
    this.showAlertSource = new Subject();
    this.showAlert$ = this.showAlertSource.asObservable();
  }

  showSuccessAlert(message) {
    this.showAlertSource.next({ message, type: "success" });
  }

  showDangerAlert(message) {
    this.showAlertSource.next({ message, type: "danger" });
  }

}