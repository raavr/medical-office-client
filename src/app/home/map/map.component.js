import "./map.component.scss";
import template from "./map.component.html";

class MapCtrl {
  
    $onInit() {
        
        this.map = {
            center: {
                latitude: 52.231766,
                longitude: 21.006038
            },
            zoom: 16,
            dragging: false
        };

        this.marker = {
            id: 0,
            coords: {
                latitude: 52.231766,
                longitude: 21.006038
            }
        };
    }
   
}

export const MapComponent = {
    template: template,
    controller: MapCtrl
}