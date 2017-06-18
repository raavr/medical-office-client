export function SmoothScrollDirective(){
    return {
        restrict: 'A',
        link: (scope, elem) => {
            elem.on("click", () => {
                const target = elem.attr("href").substr(1),
                    offset = angular.element(target).offset();
                    
                if(offset) {
                    angular.element("body").animate({
                        scrollTop : offset.top
                    }, 500);
                }
            });
        }
    };
}