import { Observable } from 'rxjs/Observable';
import VisitManageModule from './visit-manage.service';
import { CONFIG } from '../../app.constant';

describe("VisitManageService", () => {

    let $httpMock, mVisitManageService, fakeDisabledDates, fakeAvailableTimes, response;

    beforeEach(angular.mock.module(VisitManageModule));
    beforeEach(() => {
        fakeDisabledDates = [
            "22/06/2017",
            "23/06/2017",
            "26/06/2017"
        ];

        fakeAvailableTimes = [
            {
                dayOfWeek: 1, 
                visitTime: [
                    { selected: true, time: "09:30:00" }, 
                    { selected: true, time: "10:00:00" }, 
                ]
            }, 
            {
                dayOfWeek: 2, 
                visitTime: [ 
                    { selected: true, time: "13:00:00" }, 
                    { selected: false, time: "13:30:00" }
                ]
            }, 
            {
                dayOfWeek: 3, 
                visitTime: [
                    { selected: false, time: "11:00:00" }
                ]
            }
        ];
    });

    beforeEach(angular.mock.inject(($injector, visitManageService) => {
        $httpMock = $injector.get("$httpBackend");
        mVisitManageService = visitManageService;
    }));

    afterEach(() => {
        $httpMock.flush();
    });

    it("should return disabled visit dates", () => {
        response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/weekly_times");
        response.respond({ disabledDates: fakeDisabledDates });

        mVisitManageService.getAvailableTimesAndDisabledDates()
            .subscribe(s => {
                expect(s.disabledDates).toEqual(fakeDisabledDates);
            });     
    });

    it("should not return any disabled visit dates", () => {
        response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/weekly_times");
        response.respond({ disabledDates: [] });

        mVisitManageService.getAvailableTimesAndDisabledDates()
            .subscribe(s => {
                expect(s.disabledDates.length).toBe(0);
            });  
    });

    it("should return available visit times", () => {
        response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/weekly_times");
        response.respond({ weeklyVisitTimes: fakeAvailableTimes });

        mVisitManageService.getAvailableTimesAndDisabledDates()
            .subscribe(s => {
                expect(s.weeklyVisitTimes).toEqual(fakeAvailableTimes);
            });     
    });

    it("should not return any available visit times", () => {
        response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/weekly_times");
        response.respond({ weeklyVisitTimes: [] });

        mVisitManageService.getAvailableTimesAndDisabledDates().subscribe((s) => { 
            expect(s.weeklyVisitTimes.length).toBe(0);
        });
    });

    it("should update available visit times", () => {
        response = $httpMock.when("PUT", CONFIG.ENDPOINT + "/api/weekly_times");
        response.respond(200, {"message": ""});

        mVisitManageService.updateAvailableTimesAndDisabledDates()
            .subscribe(s => {
                expect(s.status).toBe(200);
                expect(s.data.message).toBe("");
            });  
    });
});