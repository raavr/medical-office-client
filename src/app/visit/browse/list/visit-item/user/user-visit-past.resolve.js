export default function PastUserVisitResolve(visitBrowseService) {
      return visitBrowseService.getPastUsersVisits().toPromise();
}

PastUserVisitResolve.$inject = ['visitBrowseService'];