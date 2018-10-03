import { Observable } from 'rxjs/Observable';

export class VisitFilterService {

  constructor($filter) {
    this.$filter = $filter;
  }

  applyFilters(visits, filters) {
    return Observable.from(visits)
      .filter((vis) => {
        const fVisit = this.$filter('date')(vis.visitdate, 'dd/MM/yyyy').toString();
        return !filters.date || fVisit.indexOf(filters.date) >= 0
      })
      .filter((vis) => {
        const fVisit = this.$filter('date')(vis.visitdate, 'HH:mm').toString();
        return !filters.time || fVisit.indexOf(filters.time) >= 0
      })
      .filter((vis) => {
        const name = `${vis.name} ${vis.surname}`;
        return !filters.name || name.indexOf(filters.name) >= 0
      })
      .filter((vis) => (!filters.status || filters.status === 'all') ? true : vis.status === filters.status)
      .toArray();
  }

  applyLimitAndOffset(visits, filters) {
    return Observable.from(visits)
      .toArray()
      .map((visits) => {
        filters.numPages = Math.ceil(visits.length / filters.limit);
        const offset = (filters.currentPage - 1) * filters.limit;
        return visits.slice(offset, offset + filters.limit);
      });
  }
}

VisitFilterService.$inject = ['$filter'];