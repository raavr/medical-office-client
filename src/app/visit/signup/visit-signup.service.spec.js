import { Observable } from 'rxjs/Observable';
import { TestScheduler } from 'rxjs';
import VisitSignupModule from './visit-signup.service';
import { CONFIG } from '../../app.constant';

describe("VisitSignupService", () => {

    let $httpMock, mVisitSignupService, fakeVisitDates, fakeVisitTimes, fakeUserName, transfVisitDates, response, scheduler;

    beforeEach(angular.mock.module(VisitSignupModule));
    beforeEach(() => {
        fakeVisitDates = [
            { date_visit: "22/06/2017" },
            { date_visit: "15/06/2017" }
        ];

        fakeVisitTimes = [
            { visittime: "09:30:00" },
            { visittime: "10:00:00" },
            { visittime: "10:30:00" }, 
            { visittime: "11:00:00" }
        ];

        fakeUserName = [
            { sn: "John Doe" }
        ];

        transfVisitDates = ["22/06/2017", "15/06/2017"];

    });

    beforeEach(angular.mock.inject(($injector, visitSignupService) => {
        $httpMock = $injector.get("$httpBackend");
        mVisitSignupService = visitSignupService;
    }));

    afterEach(() => {
        $httpMock.flush();
    });

    it("should return unavailable visit dates", () => {
        response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/visits");
        response.respond({ vts: fakeVisitDates });

        mVisitSignupService.getDisabledDates()
            .subscribe(s => {
                expect(s).toEqual(transfVisitDates);
            });     
    });

    it("should not return any unavailable visit dates", () => {
        response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/visits");
        response.respond({ vts: [] });

        mVisitSignupService.getDisabledDates()
            .subscribe(s => {
                expect(s.length).toBe(0);
            });  
    });

    it("should return available visit times", () => {
        response = $httpMock.when("POST", CONFIG.ENDPOINT + "/api/visits/times");
        response.respond({ ts: fakeVisitTimes });

        mVisitSignupService.getAvailableTimes()
            .subscribe(s => {
                expect(s).toEqual(fakeVisitTimes);
            });     
    });

    it("should return 4 visit times", () => {
        response = $httpMock.when("POST", CONFIG.ENDPOINT + "/api/visits/times");
        response.respond({ ts: fakeVisitTimes });

        mVisitSignupService.getAvailableTimes()
            .subscribe(s => {
                expect(s.length).toEqual(fakeVisitTimes.length);
            });     
    });

    it("should not return any unavailable visit times", () => {
        response = $httpMock.when("POST", CONFIG.ENDPOINT + "/api/visits/times");

        response.respond({ ts: [] });
        mVisitSignupService.getAvailableTimes().subscribe((s) => { 
            expect(s.length).toBe(0);
        });
    });

    it("should return user name", () => {
        response = $httpMock.when("POST", CONFIG.ENDPOINT + "/api/admin/usersbyname");
        response.respond({ us: fakeUserName });

        mVisitSignupService.findUsers()
            .subscribe(s => {
                expect(s).toEqual(fakeUserName);
            });  
    });

    it("should sign up patient to visit", () => {
        response = $httpMock.when("POST", CONFIG.ENDPOINT + "/api/visits/check");
        response.respond(20, {"message": "Poprawnie zapisano na wizytę"});

        mVisitSignupService.addVisit()
            .subscribe(s => {
                expect(s.status).toEqual(200);
                expect(s.data.message).toBe("Poprawnie zapisano na wizytę");
            });  
    });
});