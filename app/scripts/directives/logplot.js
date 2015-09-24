'use strict';

/**
 * @ngdoc directive
 * @name zipfApp.directive:logPlot
 * @description
 * # logPlot
 */
angular.module('zipfApp')
  .directive('logPlot', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the logPlot directive');
      }
    };
  });
