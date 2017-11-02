class OwlCarousel {
    constructor(scope) {
        this.scope = scope;
    }

    init() {
        this.scope.init();
    }
}

OwlCarousel.$inject = ['$scope'];

export function OwlCarouselDirective(){
    return {
        restrict: 'E',
        scope: {
            responsive: "<",
            nav: "<",
            autoPlay: "<"
        },
        controller: OwlCarousel,
        controllerAs: "owlCarousel",
        link: (scope, elm, attr, ctrl) => {
            const options = {
                autoplayTimeout: 5000,
                autoplay: scope.autoPlay, 
                smartSpeed : 300, 
                navSpeed : 400, 
                nav: scope.nav,
                responsive: scope.responsive,
                mergeFit: true,
                navText: [
                    '<i class=\'glyphicon glyphicon-chevron-left\'></i>',
                    '<i class=\'glyphicon glyphicon-chevron-right\'></i>'
                ]
            };
            scope.init = () => elm.owlCarousel(options);
        }
    };
}

export function OwlCarouselItemDirective($timeout) {
    return {
        restrict: "E",
        scope: {
            isLastElem: "<"
        },
        transclude: true,
        template: "<div ng-transclude></div>",
        require: "^owlCarousel",
        link: (scope, iElement, iAttrs, owlCarousel) => {

            //init owlCarousel when last child is created
            if(scope.isLastElem) {
                //workaround: without timeout owlCarousel is not working correctly
                $timeout(() => owlCarousel.init(), 500);
            }
        }

    }
}

OwlCarouselItemDirective.$inject = ['$timeout'];