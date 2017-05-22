'use strict';
import 'bootstrap/dist/css/bootstrap.css';
import './app.style.scss';

import AppConfig from './app.config';
import { AppComponent } from './app.component';
import Auth from './auth/auth';
import Navbar from './navbar/navbar';
import Home from './home/home';
import Login from './login/login';

 export default angular.module("My-app", [
      Navbar, 
      Auth, 
      Home, 
      Login
 ]).config(AppConfig)
   .component("app", AppComponent)
   .name;