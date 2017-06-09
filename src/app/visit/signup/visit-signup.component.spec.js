import { Observable } from 'rxjs/Observable';
import VisitSignupModule from './visit-signup';
import * as ToDateFunctions from '../../app.helper';

const visitTimesMock = [
    { visittime: "09:30:00" },
    { visittime: "10:00:00" },
    { visittime: "10:30:00" }, 
    { visittime: "11:00:00" }
];

const VisitSignupServiceMock = {
    getAvailableTimes: () => {
        return Observable.of(visitTimesMock);
    }
}

describe("VisitSignupComponent", () => {
    let $componentController, ctrl;
    beforeEach(angular.mock.module(VisitSignupModule));
    beforeEach(angular.mock.module(($provide) => {
        $provide.value("visitSignupService", VisitSignupServiceMock);
    }));

    beforeEach(angular.mock.inject(($injector) => {
        $componentController = $injector.get("$componentController");
        ctrl = $componentController("visitSignup", null, null);
    }));
    
    it("should initialize visit object", () => {
        expect(ctrl.visit).toBeDefined();
        expect(ctrl.visit).toEqual({});
    });

    it('should call getAvailableTimes function', () => {
        spyOn(ctrl.visitSignupService, "getAvailableTimes").and.returnValue(Observable.of(visitTimesMock));
        expect(ctrl.visitSignupService.getAvailableTimes).not.toHaveBeenCalled();
        
        ctrl.getAvailableTimes();
        
        expect(ctrl.visitSignupService.getAvailableTimes).toHaveBeenCalled();
    });

    it('should set visit times', () => {
        expect(ctrl.visit.times).not.toBeDefined();
        
        ctrl.getAvailableTimes();
        
        expect(ctrl.visit.times).toEqual(visitTimesMock); 
    });

    it('should set empty array of visit times', () => {
        spyOn(ctrl.visitSignupService, "getAvailableTimes").and.returnValue(Observable.of([]));
        expect(ctrl.visit.times).not.toBeDefined();
        
        ctrl.getAvailableTimes();
        
        expect(ctrl.visit.times.length).toBe(0);
    });

    describe("changeDate tests", () => {
        beforeEach(() => {
            spyOn(ToDateFunctions, "toDate_mmddyyyy").and.returnValue("06/20/2017");
        });

        it('should set visit date', () => {  
            expect(ctrl.visit.date).not.toBeDefined();
            
            ctrl.changeDate({date: ""});
            
            expect(ctrl.visit.date).toBe("06/20/2017");
        });

        it('should set visit date and time', () => {
            expect(ctrl.visit.date).not.toBeDefined();
            expect(ctrl.visit.times).not.toBeDefined();

            ctrl.changeDate({date: ""});

            expect(ctrl.visit.date).toBe("06/20/2017");
            expect(ctrl.visit.times).toEqual(visitTimesMock); 
        });

        it('should call getAvailableTimes function', () => {
            spyOn(ctrl, "getAvailableTimes");
            expect(ctrl.getAvailableTimes).not.toHaveBeenCalled();
            
            ctrl.changeDate({date: ""});
            
            expect(ctrl.getAvailableTimes).toHaveBeenCalled();
        });
    });



});


