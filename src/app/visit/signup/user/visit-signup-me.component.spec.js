import { Observable } from 'rxjs/Observable';
import VisitSignupModule from '../visit-signup';
import * as ToDateFunctions from '../../../app.helper';

describe("VisitSignupMeComponent", () => {
  let $componentController, ctrl, spySignupService, visitTimesMock, spyAvailableTimes, spyIsAdmin
  beforeEach(angular.mock.module(VisitSignupModule));

  beforeEach(() => {
    visitTimesMock = [
      { visitTime: "09:30:00" },
      { visitTime: "10:00:00" },
      { visitTime: "10:30:00" },
      { visitTime: "11:00:00" }
    ];
  })

  beforeEach(angular.mock.inject(($injector) => {
    $componentController = $injector.get("$componentController");
    ctrl = $componentController("visitSignupMe", null, null);
  }));

  beforeEach(() => {
    spySignupService = spyOn(ctrl.visitSignupService, "addVisit").and.returnValue(Observable.of(null));
    spyOn(ctrl.alertEventService, "showSuccessAlert");
    spyOn(ctrl.$state, "go");
    spyAvailableTimes = spyOn(ctrl.visitSignupService, "getAvailableTimes").and.returnValue(Observable.of(visitTimesMock));
    spyIsAdmin = spyOn(ctrl.authService, "isAdmin").and.returnValue(false);
  });

  it('should initialize formVisits object', () => {
    expect(ctrl.formVisit).toBeDefined();
    expect(ctrl.formVisit).toEqual({});
  });

  it('should initialize userSelected object', () => {
    expect(ctrl.userSelected).toBeDefined();
    expect(ctrl.userSelected).toEqual({});
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
    ctrl.formVisit.date = "22/06/2017";
    expect(ctrl.isSubmitDisabled()).toBe(true);
  });

  it('should isSubmitDisabled return true when selectedTime !== undefined', () => {
    ctrl.formVisit.selectedTime = { visitTime: "09:30:00" };
    expect(ctrl.isSubmitDisabled()).toBe(true);
  });

  it('should isSubmitDisabled return true when both date and selectedTime !== undefined', () => {
    ctrl.formVisit.date = "22/06/2017";
    ctrl.formVisit.selectedTime = { visitTime: "09:30:00" };
    expect(ctrl.isSubmitDisabled()).toBe(true);
  });

  it('should isSubmitDisabled return false when all form inputs are valid', () => {
    ctrl.formVisit.date = "22/06/2017";
    ctrl.formVisit.selectedTime = { visitTime: "09:30:00" };
    ctrl.userSelected.name = "John Doe";
    expect(ctrl.isSubmitDisabled()).toBe(false);
  });

  it('should set visit times', () => {
    expect(ctrl.formVisit.times).not.toBeDefined();
    ctrl.userSelected = { id: 1 };
    ctrl.getAvailableTimes();

    expect(ctrl.formVisit.times).toEqual(visitTimesMock);
  });

  it('should set empty array of visit times', () => {
    spyAvailableTimes.and.returnValue(Observable.of([]));
    ctrl.userSelected = { id: 1 };

    expect(ctrl.formVisit.times).not.toBeDefined();

    ctrl.getAvailableTimes();

    expect(ctrl.formVisit.times.length).toBe(0);
  });

  it('should not call visitSignupService.getAvailableTime', () => {
    expect(ctrl.formVisit.times).not.toBeDefined();

    ctrl.getAvailableTimes();
    expect(ctrl.visitSignupService.getAvailableTimes).not.toHaveBeenCalled();
    expect(ctrl.formVisit.times).not.toBeDefined();
  });

  describe("when addVisit() is called", () => {
    let visit;

    beforeEach(() => {
      visit = {
        userId: 1,
        date: "22/06/2017",
        selectedTime: { visitTime: "09:30:00" },
        desc: "Lorem ipsum"
      }
      spyOnProperty(ctrl, 'visit', 'get').and.returnValue(visit);
    });

    it('should call visitSignupService.addVisit', () => {
      expect(ctrl.visitSignupService.addVisit).not.toHaveBeenCalled();
      ctrl.addVisit();
      expect(ctrl.visitSignupService.addVisit).toHaveBeenCalled();
    });

    it('should call visitSignupService.addVisit with visit object', () => {
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

    describe("with error", () => {
      let err;

      beforeEach(() => {
        err = {
          data: {
            message: "err!"
          }
        };

        spySignupService.and.returnValue(Observable.throw(err));
      });

      it('should call console.log', () => {
        spyOn(console, "log");

        expect(console.log).not.toHaveBeenCalled();
        ctrl.addVisit();
        expect(console.log).toHaveBeenCalled();
        expect(console.log.calls.argsFor(0)).toEqual([err]);
      });

      it('should call alertEventService.showDangerAlert', () => {
        spyOn(ctrl.alertEventService, "showDangerAlert");

        expect(ctrl.alertEventService.showDangerAlert).not.toHaveBeenCalled();
        ctrl.addVisit();
        expect(ctrl.alertEventService.showDangerAlert).toHaveBeenCalled();
        expect(ctrl.alertEventService.showDangerAlert.calls.argsFor(0)).toEqual(["err!"]);
      });

    });
  });

  describe("changeDate tests", () => {

    beforeEach(() => {
      spyOn(ToDateFunctions, "toDate_ddmmyyyy").and.returnValue("20/06/2017");
    });

    it('should set visit date', () => {
      expect(ctrl.formVisit.date).not.toBeDefined();

      ctrl.changeDate({ date: "" });

      expect(ctrl.formVisit.date).toBe("20/06/2017");
    });

    it('should set visit date and time', () => {
      expect(ctrl.formVisit.date).not.toBeDefined();
      expect(ctrl.formVisit.times).not.toBeDefined();

      ctrl.userSelected = { id: 1 };
      ctrl.changeDate({ date: "" });

      expect(ctrl.formVisit.date).toBe("20/06/2017");
      expect(ctrl.formVisit.times).toEqual(visitTimesMock);
    });

    it('should call getAvailableTimes function', () => {
      spyOn(ctrl, "getAvailableTimes");
      expect(ctrl.getAvailableTimes).not.toHaveBeenCalled();

      ctrl.changeDate({ date: "" });

      expect(ctrl.getAvailableTimes).toHaveBeenCalled();
    });
  });

});


