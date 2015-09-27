'use strict';

/**
 * @ngdoc overview
 * @name zipfApp
 * @description
 * # zipfApp
 *
 * Main module of the application.
 */
var app = angular
  .module('zipfApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'zipfApp.services'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        activetab: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
