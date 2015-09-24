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
  			height = 600,
  			xScale = d3.scale.linear(),
  			yScale = d3.scale.linear();


    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Once the data has been loaded and ready, draw the plot 
        scope.$on('Plot_Data_Ready', function() {

        	// Remove older left over elements
        	d3.select(element[0]).selectAll('*').remove();

        	var plotData = scope.wordCounts;

        	yScale.domain([ 0, d3.max( plotData, function(d) { return d[1];})]).range([height, 0]);


        	var plot = d3.select(element[0])
        		.append('svg')
        			.attr('width', width)
        			.attr('height', height);

        	// Drawing scales and dots on the plot 
        	plot.selectAll('circle')
        		.data(plotData)
        		.enter()
        		.append('circle')
        		.attr('r', 2)
        		.attr('fill', 'black')
        		.attr('cx', function(d, i) {
        			return (i * 2) + 'px';
        		})
        		.attr('cy', function(d) {
        			return (yScale(d[1]) + 'px');
        		});


        });
      }
    };
  });
