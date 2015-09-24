'use strict';

/**
 * @ngdoc directive
 * @name zipfApp.directive:linearWordsPlot
 * @description
 * # linearWordsPlot
 */
angular.module('zipfApp')
  .directive('linearWordsPlot', function () {

  	// Plot dimensions
  	var width = 800,
  			height = 600;

    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Once the data has been loaded and ready, draw the plot 
        scope.$on('Plot_Data_Ready', function() {

        	// Remove older left over elements
        	d3.select(element[0]).selectAll('*').remove();

        	var plot = d3.select(element[0])
        		.append('svg')
        			.attr('width', width)
        			.attr('height', height);

        	plot.append('rect')
        		.attr('width', '100%')
        		.attr('height', '100%')
        		.attr('fill', '#00000');

        });
      }
    };
  });
