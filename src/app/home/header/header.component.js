import "./header.component.scss";
import template from "./header.component.html";

class HeaderCtrl {
  $onInit() {
    this.owlItems = [
      { src: "/assets/images/smiles-1.jpg", desc: "Zarejestruj się i umów na wizytę!" },
      { src: "/assets/images/smiles-2.jpg", desc: "Zadbaj o zdrowie swoich zębów!" }
    ];
  }
}

export const HeaderComponent = {
  template,
  controller: HeaderCtrl
}