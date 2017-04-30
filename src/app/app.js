'use strict';
import 'bootstrap/dist/css/bootstrap.css';
import './app.style.scss';

import { AppComponent } from './app.component';
import Auth from './auth/auth';

 export default angular.module("My-app", [
      Auth
 ]).component("app", AppComponent)
   .name;