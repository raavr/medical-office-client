export default function PastUserVisitResolve(visitBrowseService) {
      return visitBrowseService.getPastUsersVisits().toPromise().catch(() => {});
}

PastUserVisitResolve.$inject = ['visitBrowseService'];