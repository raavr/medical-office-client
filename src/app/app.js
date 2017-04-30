'use strict';
import 'bootstrap/dist/css/bootstrap.css';
import './app.style.scss';

import { AppComponent } from './app.component';
import Auth from './auth/auth';
import Navbar from './navbar/navbar';

 export default angular.module("My-app", [
      Navbar, Auth
 ]).component("app", AppComponent)
   .name;