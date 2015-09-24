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
  			yScale = d3.scale.linear(),
  			xAxis = d3.svg.axis(),
  			yAxis = d3.svg.axis(),
  			padding = 50,
  			dotRadius = 2;


    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Once the data has been loaded and ready, draw the plot 
        scope.$on('Plot_Data_Ready', function() {

        	// Remove older left over elements
        	d3.select(element[0]).selectAll('*').remove();

        	var plotData = scope.wordCounts;

        	// Setting up the scale and then the axes 
        	yScale.domain([ 0, d3.max( plotData, function(d) { return d[1];})]).range([height - padding, 0]);
        	xScale.domain([0, width]).range([0, width - 100]);

        	var plot = d3.select(element[0])
        		.append('svg')
        			.attr('width', width)
        			.attr('height', height);

        	// Drawing scales and dots on the plot 
        	plot.selectAll('circle')
        		.data(plotData)
        		.enter()
        		.append('circle')
        		.attr('r', dotRadius)
        		.attr('fill', 'black')
        		.attr('cx', function(d, i) {
        			return (xScale(i + 1)) + (padding + 5);
        		})
        		.attr('cy', function(d) {
        			return yScale(d[1]) + 30;
        		});

        	// Drawing the axes on the plot 
        	xAxis.scale(xScale).orient('bottom').ticks(20);
        	yAxis.scale(yScale).orient('left').ticks(12);

        	plot.append('g')
        		.attr('class', 'axis')
        		.attr("transform", "translate(" + (padding) + ", 30)")
        		.call(yAxis);

        	plot.append('g')
        		.attr('class', 'axis')
        		.attr("transform", "translate(50," + (height - padding + 30) + ")")
        		.call(xAxis);


        });
      }
    };
  });
