import "./price-list.component.scss";
import template from "./price-list.component.html";

class PriceListController {
  constructor(priceListService) {
    this.priceListService = priceListService;
  }

  $onInit() {
    this.priceListService
      .getPriceList()
      .subscribe(
        (data) => this.priceList = data
      );
  }
}

PriceListController.$inject = ['priceListService'];

export const PriceListComponent = {
  template,
  controller: PriceListController
}