export default function CurrentUserVisitResolve(visitBrowseService) {
      return visitBrowseService.getUsersVisits().toPromise();
}

CurrentUserVisitResolve.$inject = ['visitBrowseService'];