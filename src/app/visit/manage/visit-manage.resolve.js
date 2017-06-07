export function VisitManageUnavailableDatesResolve(visitManageService) {
      return visitManageService.getUnavailableDates().toPromise().catch(() => {});
}

VisitManageUnavailableDatesResolve.$inject = ['visitManageService'];

export function VisitManageVisitTimesResolve(visitManageService) {
      return visitManageService.getAvailableVisitTimes().toPromise().catch(() => {});
}

VisitManageVisitTimesResolve.$inject = ['visitManageService'];