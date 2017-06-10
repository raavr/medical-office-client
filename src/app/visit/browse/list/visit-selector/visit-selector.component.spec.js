import { Observable } from 'rxjs/Observable';
import VisitBrowseModule from '../../visit-browse';

describe("VisitSelectorComponent", () => {
    let $componentController, ctrl, bindings;
    beforeEach(angular.mock.module(VisitBrowseModule));

    beforeEach(() => {
        bindings = { 
            onSelectBtnClicked: () => {}
        };
    });

    beforeEach(angular.mock.inject(($injector) => {
        $componentController = $injector.get("$componentController");
        ctrl = $componentController("visitSelector", null, bindings);
    }));

    it("should initilize isSelected variable", () => {
        expect(ctrl.isSelected).not.toBeDefined();
        ctrl.$onInit();
        expect(ctrl.isSelected).toBe(false);
    });

    it("should call onSelectBtnClicked", () => {
        spyOn(ctrl, "onSelectBtnClicked");
        expect(ctrl.onSelectBtnClicked).not.toHaveBeenCalled();
        ctrl.selectAll();
        expect(ctrl.onSelectBtnClicked).toHaveBeenCalled();
    });

    it("should call onSelectBtnClicked with an argument", () => {
        spyOn(ctrl, "onSelectBtnClicked");
        ctrl.isSelected = false;
        ctrl.selectAll();
        expect(ctrl.onSelectBtnClicked.calls.argsFor(0)).toEqual([{isSelected: true}]);
    });

    it("should negate isSelected variable", () => {
        ctrl.isSelected = false;
        ctrl.selectAll();
        expect(ctrl.isSelected).toBe(true);
    });

});