import "./article-item.component.scss";
import template from "./article-item.component.html";

class ArticleItemCtrl {

}

export const ArticleItemComponent = {
    bindings: {
        item: "<"
    },
    template: template,
    controller: ArticleItemCtrl
}