import { toDate_mmddyyyy, toDate_ddmmyyyy } from './app.helper';

describe('AppHelper', () => {

  const dateString = "Fri Jun 09 2017";

  it('should format date to DD/MM/YYYY', () => {
    expect(toDate_ddmmyyyy(new Date(dateString))).toBe('09/06/2017');
  });

  it('should format date to MM/DD/YYYY', () => {
    expect(toDate_mmddyyyy(new Date(dateString))).toBe('06/09/2017');
  });

});