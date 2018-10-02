export function VisitManageVisitDatetimesResolve(visitManageService) {
      return visitManageService.getAvailableTimesAndDisabledDates().toPromise().catch(() => {});
}

VisitManageVisitDatetimesResolve.$inject = ['visitManageService'];