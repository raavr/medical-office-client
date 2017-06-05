import "./account.component.scss";
import template from "./account.component.html";

class AccountController {

}

export const AccountComponent = {
    bindings: {
        user: "<"
    },
    template: template,
    controller: AccountController
}