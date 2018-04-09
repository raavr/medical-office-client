import { Observable } from 'rxjs/Observable';
import VisitManageModule from './visit-manage.service';
import { CONFIG } from '../../app.constant';

describe("VisitManageService", () => {

    let $httpMock, mVisitManageService, fakeUnavailableDates, fakeAvailableTimes, transfDates, response;

    beforeEach(angular.mock.module(VisitManageModule));
    beforeEach(() => {
        fakeUnavailableDates = [
            { disabledate: "22/06/2017" },
            { disabledate: "23/06/2017" },
            { disabledate: "26/06/2017" }
        ];

        fakeAvailableTimes = [
            {
                dayofweek: 1, 
                visittime: [
                    { selected: true, time: "09:30:00" }, 
                    { selected: true, time: "10:00:00" }, 
                ]
            }, 
            {
                dayofweek: 2, 
                visittime: [ 
                    { selected: true, time: "13:00:00" }, 
                    { selected: false, time: "13:30:00" }
                ]
            }, 
            {
                dayofweek: 3, 
                visittime: [
                    { selected: false, time: "11:00:00" }
                ]
            }
        ];

        transfDates = ["22/06/2017", "23/06/2017", "26/06/2017"];

    });

    beforeEach(angular.mock.inject(($injector, visitManageService) => {
        $httpMock = $injector.get("$httpBackend");
        mVisitManageService = visitManageService;
    }));

    afterEach(() => {
        $httpMock.flush();
    });

    it("should return unavailable visit dates", () => {
        response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/admin/visits/disabled_dates");
        response.respond({ disabled_dates: fakeUnavailableDates });

        mVisitManageService.getUnavailableDates()
            .subscribe(s => {
                expect(s).toEqual(transfDates);
            });     
    });

    it("should not return any unavailable visit dates", () => {
        response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/admin/visits/disabled_dates");
        response.respond({ disabled_dates: [] });

        mVisitManageService.getUnavailableDates()
            .subscribe(s => {
                expect(s.length).toBe(0);
            });  
    });

    it("should return available visit times", () => {
        response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/admin/visits/weeks_times");
        response.respond({ weeks_times: fakeAvailableTimes });

        mVisitManageService.getAvailableVisitTimes()
            .subscribe(s => {
                expect(s).toEqual(fakeAvailableTimes);
            });     
    });

    it("should not return any available visit times", () => {
        response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/admin/visits/weeks_times");
        response.respond({ weeks_times: [] });

        mVisitManageService.getAvailableVisitTimes().subscribe((s) => { 
            expect(s.length).toBe(0);
        });
    });

    it("should update available visit times", () => {
        response = $httpMock.when("PUT", CONFIG.ENDPOINT + "/api/admin/visits/weeks_times");
        response.respond(200, {"message": ""});

        mVisitManageService.updateAvailableVisitTimes()
            .subscribe(s => {
                expect(s.status).toBe(200);
                expect(s.data.message).toBe("");
            });  
    });
});