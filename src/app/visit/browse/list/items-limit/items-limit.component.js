import "./items-limit.component.scss";
import template from "./items-limit.component.html";

class ItemsLimitController {
  $onInit() {
    this.selectedEntry = this.entries[1];
  }
}

export const ItemsLimitComponent = {
  bindings: {
    entries: "<",
    onLimitChange: "&"
  },
  template,
  controller: ItemsLimitController
}