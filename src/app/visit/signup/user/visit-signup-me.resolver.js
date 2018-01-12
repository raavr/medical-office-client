export default function VisitSignupMeResolve(visitSignupService) {
      return visitSignupService.getDoctors().toPromise().catch(() => {});
}

VisitSignupMeResolve.$inject = ['visitSignupService'];