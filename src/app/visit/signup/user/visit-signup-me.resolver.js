export default function VisitSignupMeResolve(visitService) {
      return visitService.getDisabledDates().toPromise();
}

VisitSignupMeResolve.$inject = ['visitService'];