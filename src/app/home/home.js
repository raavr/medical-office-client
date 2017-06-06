import uiRouter from 'angular-ui-router';
import HomeConfig from './home.config';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { ArticlesComponent } from './article/articles.component';
import { ArticleItemComponent } from './article/article-item/article-item.component';
import { AsideSignupComponent } from './aside-signup/aside-signup.component';
import { OwlCarouselDirective, OwlCarouselItemDirective } from './header/owl-carousel.directive';

export default 
    angular.module("home", [uiRouter])
           .config(HomeConfig)
           .component("home", HomeComponent)
           .component("appHeader", HeaderComponent)
           .component("articles", ArticlesComponent)
           .component("articleItem", ArticleItemComponent)
           .component("asideSignup", AsideSignupComponent)
           .directive("owlCarousel", OwlCarouselDirective)
           .directive("owlCarouselItem", OwlCarouselItemDirective)
           .name;
