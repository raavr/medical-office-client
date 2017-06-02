import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class AlertEventService {

    constructor() {
        this.showAlertSource = new Subject();
        this.showAlertObservable = this.showAlertSource.asObservable();
    }
   
    showSuccessAlert(message) {
        this.showAlertSource.next({ message: message, type: "success" });
    }

    showDangerAlert(message) {
        this.showAlertSource.next({ message: message, type: "danger" });
    }
   
}