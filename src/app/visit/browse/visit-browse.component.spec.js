import { Observable } from "rxjs/Observable";
import VisitBrowseModule from "./visit-browse";

describe("VisitBrowseComponent", () => {
  let $componentController, ctrl, $rootScope, $compile, spyState;
  beforeEach(angular.mock.module(VisitBrowseModule));

  beforeEach(angular.mock.inject(($injector) => {
    $componentController = $injector.get("$componentController");
    ctrl = $componentController("visitBrowse", null, null);
    $rootScope = $injector.get("$rootScope");
    $compile = $injector.get("$compile");
  }));

  beforeEach(() => {
    spyState = spyOn(ctrl.$state, "is");
  });

  it('should call _isCurrentTabStateActive and _setActivatedTab', () => {
    spyOn(ctrl, "_isCurrentTabStateActive");
    spyOn(ctrl, "_setActivatedTab");

    expect(ctrl._isCurrentTabStateActive).not.toHaveBeenCalled();
    expect(ctrl._setActivatedTab).not.toHaveBeenCalled();
    ctrl.$onInit();
    expect(ctrl._isCurrentTabStateActive).toHaveBeenCalled();
    expect(ctrl._setActivatedTab).toHaveBeenCalled();
  });

  it("should set activatedTab to 'current'", () => {
    const CURRENT_TAB = true;
    spyState.and.returnValue(CURRENT_TAB);
    expect(ctrl.activatedTab).not.toBeDefined();
    ctrl.$onInit();
    expect(ctrl.activatedTab).toBe('current');
  });

  it("should set activatedTab to 'past'", () => {
    const CURRENT_TAB = false;
    spyState.and.returnValue(CURRENT_TAB);
    expect(ctrl.activatedTab).not.toBeDefined();
    ctrl.$onInit();
    expect(ctrl.activatedTab).toBe('past');
  });

  describe("when VisitBrowseComponent is compiled manually", () => {

    let element, ctrl, scope;

    beforeEach(() => {
      scope = $rootScope.$new();
      element = $compile("<visit-browse></visit-browse>")(scope);
      ctrl = element.controller("visitBrowse");
      scope.$apply();
    });

    describe("when nav-tabs link element is clicked", () => {

      it("should call activeTab", () => {
        spyOn(ctrl, "activeTab");

        expect(ctrl.activeTab).not.toHaveBeenCalled();
        element.find(".nav-tabs li a").eq(1).triggerHandler("click");
        expect(ctrl.activeTab).toHaveBeenCalled();
      });

      it("should set activatedTab to 'current'", () => {
        element.find(".nav-tabs li a").eq(0).triggerHandler("click");
        expect(ctrl.activatedTab).toEqual('current');
      });

      it("should set nav-tabs link's href attr to '/visit/browse/past' and ui-sref to 'visit-browse.past'", () => {
        const href = element.find(".nav-tabs li a").eq(1).attr("href").substr(2);
        const uiSref = element.find(".nav-tabs li a").eq(1).attr("ui-sref");

        expect(href).toEqual('/visit/browse/past');
        expect(uiSref).toEqual('visit-browse.past');
      });

      it("should show loading panel", () => {
        ctrl.setLoading(true);
        scope.$apply();
        const loadingPanel = element.find(".tab-content").children().eq(0);
        expect(loadingPanel.text()).toEqual("Trwa wczytywanie...");
      });

    });

  });

});