export default function CurrentAdminVisitResolve(visitBrowseService) {
      return visitBrowseService.getAdminVisits().toPromise().catch(() => {});
}


CurrentAdminVisitResolve.$inject = ['visitBrowseService'];