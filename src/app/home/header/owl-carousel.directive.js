export function OwlCarouselDirective(){
    return {
        restrict: 'E',
        scope: {
            items: "<"
        },
        link: (scope, elm, attr, ctrl) => {
            let options = {
                autoplayTimeout: 5000,
                autoplay: true, 
                stopOnHover: true,  
                smartSpeed : 300, 
                navSpeed : 400, 
                nav: true,
                items: +scope.items,
                navText: [
                    '<i class=\'glyphicon glyphicon-chevron-left\'></i>',
                    '<i class=\'glyphicon glyphicon-chevron-right\'></i>'
                ]
            };
            elm.owlCarousel(options);
        }
    };
}

export function OwlCarouselItemDirective() {
    return {
        restrict: "E",
        transclude: true,
        template: "<div ng-transclude></div>"
    }
}