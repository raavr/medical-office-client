'use strict';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
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
import Signup from './signup/signup';
import Patient from './patient/patient';
import Footer from './footer/footer';
import NoContent from './no-content/no-content';
import ForgotPass from './forgot-pass/forgot-pass';
import AppInit from './app.init';
import Dashboard from './dashboard/dashboard';

export default angular.module("My-app", [
  Navbar,
  Auth,
  Home,
  Login,
  Dashboard,
  Visit,
  Alert,
  Account,
  Signup,
  Patient,
  Footer,
  NoContent,
  ForgotPass
]).config(AppConfig)
  .run(AppInit)
  .component("app", AppComponent)
  .name;