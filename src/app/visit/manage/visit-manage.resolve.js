export function VisitManageUnavailableDatesResolve(visitManageService) {
      return visitManageService.getUnavailableDates().toPromise();
}

VisitManageUnavailableDatesResolve.$inject = ['visitManageService'];

export function VisitManageVisitTimesResolve(visitManageService) {
      return visitManageService.getAvailableVisitTimes().toPromise();
}

VisitManageVisitTimesResolve.$inject = ['visitManageService'];