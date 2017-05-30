export default function PastAdminVisitResolve(visitBrowseService) {
      return visitBrowseService.getPastAdminVisits().toPromise();
}

PastAdminVisitResolve.$inject = ['visitBrowseService'];