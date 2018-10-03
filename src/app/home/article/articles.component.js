import "./articles.component.scss";
import template from "./articles.component.html";

class ArticlesCtrl {

  $onInit() {
    this.articles = [
      {
        "createdate": "2017-06-06T11:48:37",
        "description": "Informacje o zdrowym odżywianiu",
        "img": "/assets/images/fruits.jpg",
        "title": "Zdrowe odżywianie"
      },
      {
        "createdate": "2017-05-30T18:51:21",
        "description": "Gabinet b\u0119dzie nieczynny dnia 31.05.2017 z powodu wyjazdu.",
        "img": "/assets/images/doctor.jpg",
        "title": "Gabinet nieczynny!"
      },
      {
        "createdate": "2017-05-11T15:20:00",
        "description": "Od dziś możliwość zapisu na wizyty poprzez stronę internetową.",
        "img": "/assets/images/article-keyboard.jpg",
        "title": "Zapisz się na wizytę"
      }
    ];

  }
}

export const ArticlesComponent = {
  template,
  controller: ArticlesCtrl
}