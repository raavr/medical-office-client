import { Observable } from 'rxjs/Observable';
import VisitSignupModule from '../visit-signup';

describe("VisitSignupMeComponent", () => {
    let $componentController, ctrl, spySignupService, bindings;
    beforeEach(angular.mock.module(VisitSignupModule));

    beforeEach(() => {
        bindings = { 
            disabledDates: ["22/06/2017", "23/06/2017", "26/06/2017"], 
            parent: {
                visit: {}
            }
        };
    })

    beforeEach(angular.mock.inject(($injector) => {
        $componentController = $injector.get("$componentController");
        ctrl = $componentController("visitSignupMe", null, bindings);
    }));
    
    beforeEach(() => {
        spySignupService = spyOn(ctrl.visitSignupService, "addVisit").and.returnValue(Observable.of(null));
        spyOn(ctrl.alertEventService, "showSuccessAlert");
        spyOn(ctrl.$state, "go");
    });

    it('should initialize disabledDates', () => {
        expect(ctrl.disabledDates).toEqual(bindings.disabledDates);
    });

    it('should initialize parent', () => {
        expect(ctrl.parent).toEqual(bindings.parent);
    });

    it("should initialize services", () => {
        expect(ctrl.alertEventService).toBeDefined();
        expect(ctrl.visitSignupService).toBeDefined();
        expect(ctrl.$state).toBeDefined();
    });

    it('should isSubmitDisabled return true', () => {
        expect(ctrl.isSubmitDisabled()).toBe(true);
    });

    it('should isSubmitDisabled return true when date !== undefined', () => {
        ctrl.parent.visit.date = "22/06/2017";
        expect(ctrl.isSubmitDisabled()).toBe(true);
    });

    it('should isSubmitDisabled return true when selectedTime !== undefined', () => {
        ctrl.parent.visit.selectedTime = { visittime: "09:30:00" };
        expect(ctrl.isSubmitDisabled()).toBe(true);
    });

    it('should isSubmitDisabled return false when both date and selectedTime !== undefined', () => {
        ctrl.parent.visit.date = "22/06/2017";
        ctrl.parent.visit.selectedTime = { visittime: "09:30:00" };
        expect(ctrl.isSubmitDisabled()).toBe(false);
    });

    describe("when addVisit() is called", () => {

        beforeEach(() => {
            ctrl.parent.visit = {
                date: "22/06/2017",
                selectedTime: { visittime: "09:30:00" },
                desc: "Lorem ipsum"
            }   
        });
         
         it('should call visitSignupService.addVisit', () => {
            expect(ctrl.visitSignupService.addVisit).not.toHaveBeenCalled();
            ctrl.addVisit();
            expect(ctrl.visitSignupService.addVisit).toHaveBeenCalled();
        });

        it('should call visitSignupService.addVisit with visit object', () => {
            const visit = {
                date: "22/06/2017",
                time: "09:30:00",
                desc: "Lorem ipsum"  
            };

            expect(ctrl.visitSignupService.addVisit).not.toHaveBeenCalled();
            ctrl.addVisit();
            expect(ctrl.visitSignupService.addVisit).toHaveBeenCalledWith(visit);
        });

        it('should call alertEventService.showSuccessAlert', () => {
            expect(ctrl.alertEventService.showSuccessAlert).not.toHaveBeenCalled();
            ctrl.addVisit();
            expect(ctrl.alertEventService.showSuccessAlert).toHaveBeenCalled();
            expect(ctrl.alertEventService.showSuccessAlert.calls.argsFor(0)).toEqual(["Zapisałeś się na wizytę."]);
        });

        it('should call $state.go', () => {
            expect(ctrl.$state.go).not.toHaveBeenCalled();
            ctrl.addVisit();
            expect(ctrl.$state.go).toHaveBeenCalled();
            expect(ctrl.$state.go.calls.argsFor(0)).toEqual(["visit-browse.current"]);
        
        });

        it('should call console.log', () => {
            const err = new Error("Error");
            spySignupService.and.returnValue(Observable.throw(err));
            spyOn(console, "log");
            
            expect(console.log).not.toHaveBeenCalled();
            ctrl.addVisit();
            expect(console.log).toHaveBeenCalled();
            expect(console.log.calls.argsFor(0)).toEqual([err]);
        });

    });

});


