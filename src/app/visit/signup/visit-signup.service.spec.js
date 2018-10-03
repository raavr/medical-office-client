import { Observable } from 'rxjs/Observable';
import VisitSignupModule from './visit-signup.service';
import { CONFIG } from '../../app.constant';

describe("VisitSignupService", () => {

  let $httpMock, mVisitSignupService, fakeVisitDates, fakeVisitTimes, fakeUser, transfUser, response;

  beforeEach(angular.mock.module(VisitSignupModule));
  beforeEach(() => {
    fakeVisitDates = [
      "22/06/2017",
      "15/06/2017"
    ];

    fakeVisitTimes = [
      { visitTime: "09:30:00" },
      { visitTime: "10:00:00" },
      { visitTime: "10:30:00" },
      { visitTime: "11:00:00" }
    ];

    fakeUser = [{
      id: '1',
      name: "John",
      surname: "Doe"
    }];

    transfUser = [{
      id: '1',
      name: "John Doe"
    }]
  });

  beforeEach(angular.mock.inject(($injector, visitSignupService) => {
    $httpMock = $injector.get("$httpBackend");
    mVisitSignupService = visitSignupService;
  }));

  afterEach(() => {
    $httpMock.flush();
  });

  it("should return unavailable visit dates", () => {
    response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/unavailable_dates");
    response.respond({ disabledDates: fakeVisitDates });

    mVisitSignupService.getDisabledDates()
      .subscribe(s => {
        expect(s).toEqual(fakeVisitDates);
      });
  });

  it("should not return any unavailable visit dates", () => {
    response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/unavailable_dates");
    response.respond({ disabledDates: [] });

    mVisitSignupService.getDisabledDates()
      .subscribe(s => {
        expect(s.length).toBe(0);
      });
  });

  it("should return available visit times", () => {
    response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/available_times");
    response.respond(fakeVisitTimes);

    mVisitSignupService.getAvailableTimes()
      .subscribe(s => {
        expect(s).toEqual(fakeVisitTimes);
      });
  });

  it("should return 4 visit times", () => {
    response = $httpMock.whenGET(CONFIG.ENDPOINT + "/api/available_times");
    response.respond(fakeVisitTimes);

    mVisitSignupService.getAvailableTimes()
      .subscribe(s => {
        expect(s.length).toEqual(fakeVisitTimes.length);
      });
  });

  it("should not return any unavailable visit times", () => {
    response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/available_times");

    response.respond([]);
    mVisitSignupService.getAvailableTimes()
      .subscribe((s) => {
        expect(s.length).toBe(0);
      });
  });

  it("should return user name", () => {
    response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/patients");
    response.respond(fakeUser);

    mVisitSignupService.findUsers()
      .subscribe(s => {
        expect(s).toEqual(transfUser);
      });
  });

  it("should sign up patient to visit", () => {
    response = $httpMock.when("POST", CONFIG.ENDPOINT + "/api/visits");
    response.respond(201, { "message": "Poprawnie zapisano na wizytę" });

    mVisitSignupService.addVisit()
      .subscribe(s => {
        expect(s.status).toEqual(201);
        expect(s.data.message).toBe("Poprawnie zapisano na wizytę");
      });
  });
});