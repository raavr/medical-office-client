import { Observable } from "rxjs/Observable";
import VisitManageModule from "../visit-manage";

describe("DayOfWeekComponent", () => {
  let $componentController, ctrl, bindings, $rootScope, $compile;
  beforeEach(angular.mock.module(VisitManageModule));

  beforeEach(() => {
    bindings = {
      visitTime: {
        dayOfWeek: 1,
        visitTime: [
          { selected: false, time: "09:30:00" },
          { selected: false, time: "10:00:00" }
        ]
      }
    };
  });

  beforeEach(angular.mock.inject(($injector) => {
    $componentController = $injector.get("$componentController");
    ctrl = $componentController("dayOfWeek", null, bindings);
    $rootScope = $injector.get("$rootScope");
    $compile = $injector.get("$compile");
  }));

  it("should initilize visitTime variable", () => {
    expect(ctrl.visitTime).toBe(bindings.visitTime);
  });

  it("should call setSelected", () => {
    spyOn(ctrl, "setSelected");
    expect(ctrl.setSelected).not.toHaveBeenCalled();
    ctrl.setSelected();
    expect(ctrl.setSelected).toHaveBeenCalled();
  });

  it("should set selected property to true for every element of visitTime array", () => {
    expect(ctrl.visitTime.visitTime).toBe(bindings.visitTime.visitTime);
    ctrl.setSelected(true);
    ctrl.visitTime.visitTime.forEach((elem) => expect(elem.selected).toBe(true));
  });

  describe("when DayOfWeekComponent was compiled manually", () => {

    let element, ctrl;

    beforeEach(() => {
      const scope = $rootScope.$new();
      element = $compile("<day-of-week></day-of-week>")(scope);
      ctrl = element.controller("dayOfWeek");
      ctrl.visitTime = bindings.visitTime;
      scope.$apply();
    });

    it("should create 2 elements with checkbox class", () => {
      const checkboxesCount = element.find(".checkbox").length;
      expect(checkboxesCount).toBe(2);
    });

    describe("when 'a' element was clicked", () => {

      it("should call setSelected with true", () => {
        spyOn(ctrl, "setSelected");
        element.find("a").eq(0).triggerHandler("click");
        expect(ctrl.setSelected).toHaveBeenCalledWith(true);
      });

      it("should set selected property to true for every element of visitTime array", () => {
        ctrl.visitTime.visitTime.forEach((elem) => expect(elem.selected).toBe(false));
        element.find("a").eq(0).triggerHandler("click");
        ctrl.visitTime.visitTime.forEach((elem) => expect(elem.selected).toBe(true));
      });

      it("should call setSelected with false", () => {
        spyOn(ctrl, "setSelected");
        element.find("a").eq(1).triggerHandler("click");
        expect(ctrl.setSelected).toHaveBeenCalledWith(false);
      });

      it("should set selected property to false for every element of visitTime array", () => {
        ctrl.visitTime.visitTime.forEach((elem) => expect(elem.selected).toBe(false));
        element.find("a").eq(1).triggerHandler("click");
        ctrl.visitTime.visitTime.forEach((elem) => expect(elem.selected).toBe(false));
      });
    });
  });
});