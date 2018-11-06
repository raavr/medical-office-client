import VisitManageModule from '../visit-manage';
import * as ToDateFunctions from '../../../app.helper';

describe("DisabledDateComponent", () => {
  let $componentController, ctrl, spyManageService, bindings, fakeUniqueSortedDates;
  beforeEach(angular.mock.module(VisitManageModule));

  beforeEach(() => {
    bindings = {
      disabledDates: ["22/06/2017", "22/06/2017", "26/06/2017"]
    };
    fakeUniqueSortedDates = ["22/06/2017", "26/06/2017"];
  })

  beforeEach(angular.mock.inject(($injector) => {
    $componentController = $injector.get("$componentController");
    ctrl = $componentController("disabledDate", null, bindings);
  }));

  beforeEach(() => {
    spyOn(ToDateFunctions, "toDate_ddmmyyyy").and.returnValue("20/06/2017");
  });

  it('should create unique set with dates', () => {
    expect(ctrl.disabledDatesSet).not.toBeDefined();
    ctrl.$onInit();
    expect([...ctrl.disabledDatesSet]).toEqual(fakeUniqueSortedDates);
  });

  it('should create empty unique set', () => {
    ctrl.disabledDates = [];
    expect(ctrl.disabledDatesSet).not.toBeDefined();
    ctrl.$onInit();
    expect([...ctrl.disabledDatesSet]).toEqual([]);
  });

  it('should set disabledDates', () => {
    const date = { date: new Date("Fri Jun 20 2017") };
    ctrl.changeDate(date);
    expect(ctrl.currentDate).toEqual("20/06/2017");
  });

  describe('when addDate() or removeDate() is called', () => {
    let makeListSpy;
    beforeEach(() => {
      spyOn(ctrl, '_makeListFromSet');
    });

    it('should not add currentDate to the set when currentDate is undefined', () => {
      expect(ctrl.disabledDatesSet).not.toBeDefined();
      expect(ctrl.currentDate).not.toBeDefined();
      ctrl.addDate();

      expect(ctrl.disabledDatesSet).not.toBeDefined();
      expect(ctrl.disabledDates).toEqual(bindings.disabledDates);
    });

    it('should add currentDate to the set', () => {
      ctrl.currentDate = '20/06/2017';
      ctrl.$onInit();
      expect([...ctrl.disabledDatesSet]).toEqual(fakeUniqueSortedDates);
      ctrl.addDate();

      expect([...ctrl.disabledDatesSet]).toEqual([...fakeUniqueSortedDates, '20/06/2017']);
      expect(ctrl._makeListFromSet).toHaveBeenCalled();
    });

    it('should add already existing date to the set so that set shouldn\'t change', () => {
      ctrl.currentDate = '22/06/2017';
      ctrl.$onInit();
      expect([...ctrl.disabledDatesSet]).toEqual(fakeUniqueSortedDates);
      ctrl.addDate();

      expect([...ctrl.disabledDatesSet]).toEqual([...fakeUniqueSortedDates]);
      expect(ctrl._makeListFromSet).toHaveBeenCalled();
    });

    it('shuld remove date from the set', () => {
      ctrl.$onInit();
      expect([...ctrl.disabledDatesSet]).toEqual(fakeUniqueSortedDates);
      ctrl.removeDate('22/06/2017');
      expect([...ctrl.disabledDatesSet]).toEqual([...fakeUniqueSortedDates.slice(1)]);
      expect(ctrl._makeListFromSet).toHaveBeenCalled();
    });    
  });

  it('should sort disabledDates when dates have the same year and different month and day', () => {
    ctrl.disabledDatesSet = new Set(['22/06/2017', '20/07/2017', '19/07/2017']);
    ctrl._makeListFromSet();
    expect(ctrl.disabledDates).toEqual(['22/06/2017', '19/07/2017', '20/07/2017']);
  });

  it('should sort disabledDates when dates have the same year and month and different day', () => {
    ctrl.disabledDatesSet = new Set(['22/07/2017', '20/07/2017', '19/07/2017']);
    ctrl._makeListFromSet();
    expect(ctrl.disabledDates).toEqual(['19/07/2017', '20/07/2017', '22/07/2017']);
  });

  it('should sort disabledDates when dates have the same month and day and different year', () => {
    ctrl.disabledDatesSet = new Set(['22/06/2018', '22/06/2017', '22/06/2016']);
    ctrl._makeListFromSet();
    expect(ctrl.disabledDates).toEqual(['22/06/2016', '22/06/2017', '22/06/2018']);
  });

});


