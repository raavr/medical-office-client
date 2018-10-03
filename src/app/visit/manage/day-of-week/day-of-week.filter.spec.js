import VisitMangeModule from '../visit-manage';
import DayOfWeekNameFilter from './day-of-week.filter';

describe('DayOfWeekFilter', () => {
  let dayOfWeekNameFun;

  beforeEach(angular.mock.module(VisitMangeModule));

  beforeEach(angular.mock.inject((dayOfWeekNameFilter) => {
    dayOfWeekNameFun = dayOfWeekNameFilter;
  }));

  it('transform 1 to "Poniedziałek"', () => {
    expect(dayOfWeekNameFun(1)).toBe('Poniedziałek');
  });

  it('transform 3 to a day name and check if returned string is not equal to "Wtorek"', () => {
    expect(dayOfWeekNameFun(3)).not.toBe('Wtorek');
  });

  it('should throw an Error', () => {
    expect(dayOfWeekNameFun).toThrowError("Required argument is not an integer number");
  });

  it('should throw an Error when required argument is null', () => {
    expect(() => dayOfWeekNameFun(null)).toThrow(new Error("Required argument is not an integer number"));
  });

  it('should throw an Error when required number is less than 1', () => {
    expect(() => dayOfWeekNameFun(0)).toThrow(new Error("Required number is not in range"));
  });

  it('should throw an Error when required number is greater than 5', () => {
    expect(() => dayOfWeekNameFun(6)).toThrow(new Error("Required number is not in range"));
  });

});