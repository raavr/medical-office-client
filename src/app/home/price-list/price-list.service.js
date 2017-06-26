import { Observable } from 'rxjs/Observable';

export class PriceListService {

    constructor($http) {
        this.$http = $http;
    }

    getPriceList() {
        let resPromise = this.$http.get("/assets/mock-data/price-list.json");
        return Observable.fromPromise(resPromise).map(res => res.data.priceList);
    }

}

PriceListService.$inject = ["$http"];