export default function CurrentAdminVisitResolve(visitBrowseService) {
      return visitBrowseService.getAdminVisits().toPromise();
}


CurrentAdminVisitResolve.$inject = ['visitBrowseService'];