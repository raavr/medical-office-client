export default function VisitSignupMeResolve(visitSignupService) {
      return visitSignupService.getDisabledDates().toPromise();
}

VisitSignupMeResolve.$inject = ['visitSignupService'];