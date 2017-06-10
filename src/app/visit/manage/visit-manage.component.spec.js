import { Observable } from 'rxjs/Observable';
import VisitManageModule from './visit-manage';
import * as ToDateFunctions from '../../app.helper';

describe("VisitManageComponent", () => {
    let $componentController, ctrl, spyManageService, bindings;
    beforeEach(angular.mock.module(VisitManageModule));

    beforeEach(() => {
        bindings = { 
            disabledDates: ["22/06/2017", "23/06/2017", "26/06/2017"], 
            visitTimes: [
                {
                    dayofweek: 1, 
                    visittime: [
                        { selected: true, time: "09:30:00" }, 
                        { selected: true, time: "10:00:00" }, 
                    ]
                }
            ]
        };
    })

    beforeEach(angular.mock.inject(($injector) => {
        $componentController = $injector.get("$componentController");
        ctrl = $componentController("visitManage", null, bindings);
    }));
    
    beforeEach(() => {
        spyManageService = spyOn(ctrl.visitManageService, "updateAvailableVisitTimes").and.returnValue(Observable.of(null));
        spyOn(ctrl.alertEventService, "showSuccessAlert");
        spyOn(ctrl.alertEventService, "showDangerAlert");
        spyOn(ToDateFunctions, "toDate_ddmmyyyy").and.returnValue("20/06/2017");
    });

    it('should initialize disabledDates', () => {
        expect(ctrl.disabledDates).toEqual(bindings.disabledDates);
    });

    it('should initialize visitTimes', () => {
        expect(ctrl.visitTimes).toEqual(bindings.visitTimes);
    });

    it("should initialize services", () => {
        expect(ctrl.alertEventService).toBeDefined();
        expect(ctrl.visitManageService).toBeDefined();
    });

    it('should set disabledDates', () => {
        const dates = { dates: [ new Date("Fri Jun 20 2017"), new Date("Fri Jun 20 2017") ] };
        ctrl.changeDate(dates);

        expect(ctrl.disabledDates).toEqual(["20/06/2017", "20/06/2017"]);
    });

    describe("when saveChange() is called", () => {
         
         it('should call visitManageService.updateAvailableVisitTimes', () => {
            expect(ctrl.visitManageService.updateAvailableVisitTimes).not.toHaveBeenCalled();
            ctrl.saveChanges();
            expect(ctrl.visitManageService.updateAvailableVisitTimes).toHaveBeenCalled();
        });

        it('should call alertEventService.showSuccessAlert', () => {
            expect(ctrl.alertEventService.showSuccessAlert).not.toHaveBeenCalled();
            ctrl.saveChanges();
            expect(ctrl.alertEventService.showSuccessAlert).toHaveBeenCalled();
            expect(ctrl.alertEventService.showSuccessAlert.calls.argsFor(0)).toEqual(["Zmiany zostały wprowadzone."]);
        
        });

        it('should call alertEventService.showDangerAlert', () => {
            spyManageService.and.returnValue(Observable.throw());
            expect(ctrl.alertEventService.showDangerAlert).not.toHaveBeenCalled();
            ctrl.saveChanges();
            expect(ctrl.alertEventService.showDangerAlert).toHaveBeenCalled();
            expect(ctrl.alertEventService.showDangerAlert.calls.argsFor(0)).toEqual(["Wystąpił błąd. Zmiany nie zostały wprowadzone."]);
        });

    });

});


