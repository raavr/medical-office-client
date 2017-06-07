export default function CurrentUserVisitResolve(visitBrowseService) {
      return visitBrowseService.getUsersVisits().toPromise().catch(() => {});
}

CurrentUserVisitResolve.$inject = ['visitBrowseService'];