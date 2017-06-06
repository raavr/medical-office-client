import uiRouter from 'angular-ui-router';
import HomeConfig from './home.config';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { OwlCarouselDirective, OwlCarouselItemDirective } from './header/owl-carousel.directive';

export default 
    angular.module("home", [uiRouter])
           .config(HomeConfig)
           .component("home", HomeComponent)
           .component("appHeader", HeaderComponent)
           .directive("owlCarousel", OwlCarouselDirective)
           .directive("owlCarouselItem", OwlCarouselItemDirective)
           .name;
