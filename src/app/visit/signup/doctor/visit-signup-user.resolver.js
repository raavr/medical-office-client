export default function VisitSignupUserResolve(visitSignupService) {
  return visitSignupService.getDisabledDates().toPromise().catch(() => { });
}

VisitSignupUserResolve.$inject = ['visitSignupService'];