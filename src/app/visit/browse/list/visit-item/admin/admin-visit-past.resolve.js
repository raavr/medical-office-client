export default function PastAdminVisitResolve(visitBrowseService) {
      return visitBrowseService.getPastAdminVisits().toPromise().catch(() => {});
}

PastAdminVisitResolve.$inject = ['visitBrowseService'];