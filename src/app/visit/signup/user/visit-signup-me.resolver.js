export default function VisitSignupMeResolve(visitSignupService) {
      return visitSignupService.getDisabledDates().toPromise().catch(() => {});
}

VisitSignupMeResolve.$inject = ['visitSignupService'];