import "./offer.component.scss";
import template from "./offer.component.html";

class OfferCtrl {
    $onInit() {
        this.currentOfferIdx = -1;
        this.offerDescs = [{
                icon: 'fa fa-medkit',
                title: 'Stomatologia zachowawcza',
                desc: 'Opis 1'
            }, {
                icon: 'fa fa-user-md',
                title: 'Protetyka',
                desc: 'Opis 2'
            }, {
                icon: 'fa fa-hospital-o',
                title: 'Chirurgia',
                desc: 'Opis 3'
            }, {
                icon: 'fa fa-plus-square',
                title: 'Periodontologia',
                desc: 'Opis 4'
            }, {
                icon: 'fa fa-stethoscope',
                title: 'Endodoncja',
                desc: 'Opis 5'
            }, {
                icon: 'fa fa-heartbeat',
                title: 'Ortodoncja',
                desc: 'Opis 6'
            }, {
                icon: 'fa fa-h-square',
                title: 'Higiena',
                desc: 'Opis 7'
            }];
    }

    setOfferDesc(index) {
        this.currentOffer = this.offerDescs[index];
    }
   
}

export const OfferComponent = {
    template: template,
    controller: OfferCtrl
}