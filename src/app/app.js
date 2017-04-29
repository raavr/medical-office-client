'use strict';
import 'bootstrap/dist/css/bootstrap.css';
import './app.style.scss';

import { AppComponent } from './app.component';

 export default angular.module("My-app", [])
       .component("app", AppComponent)
       .name;