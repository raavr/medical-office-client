'use strict';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import './app.style.scss';

import AppConfig from './app.config';
import { AppComponent } from './app.component';
import Auth from './auth/auth';
import Navbar from './navbar/navbar';
import Home from './home/home';
import Login from './login/login';
import Visit from './visit/visit';
import Alert from './alert/alert';
import Account from './account/account';

 export default angular.module("My-app", [
      Navbar, 
      Auth, 
      Home, 
      Login,
      Visit,
      Alert,
      Account
 ]).config(AppConfig)
   .component("app", AppComponent)
   .name;