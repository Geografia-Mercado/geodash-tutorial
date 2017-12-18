import angular from 'angular';
import uiRouter from '../../node_modules/@uirouter/angularjs/release/angular-ui-router.js'

import Config from './config.js'

import AppDirective from './app.directive.js'

import LoginController from './layout/login/login.controller.js'

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uiRouter])
.config(['$stateProvider', Config])
.directive('app', AppDirective)
.controller('loginController', LoginController)

export default MODULE_NAME;
