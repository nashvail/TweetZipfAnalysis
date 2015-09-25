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
  	var width = 600,
  			height = 400,
  			xScale = d3.scale.linear(),
  			yScale = d3.scale.linear(),
  			xAxis = d3.svg.axis(),
  			yAxis = d3.svg.axis(),
  			padding = 30,
  			dotRadius = 4,
        dotColor = '#002C7C';


    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Once the data has been loaded and ready, draw the plot 
        scope.$on('Plot_Data_Ready', function() {

        	// Remove older left over elements
        	d3.select(element[0]).selectAll('*').remove();

        	var plotData = scope.wordCounts;

        	// Setting up the scale and then the axes 
        	yScale.domain([ 0, d3.max( plotData, function(d) { return d[1];}) + 5]).range([height - padding, 0]);
        	xScale.domain([0, plotData.length]).range([0, width - padding - 10]);

        	var plot = d3.select(element[0])
        		.append('svg')
        			.attr('width', width)
              .attr('height', height)
              .attr('class', 'realPlot');

        	// Drawing scales and dots on the plot 
        	plot.selectAll('circle')
        		.data(plotData)
        		.enter()
        		.append('circle')
        		.attr('r', dotRadius)
        		.attr('fill', dotColor)
        		.attr('cx', function(d, i) {
        			return xScale(i) + padding + 2;
        		})
        		.attr('cy', function(d) {
        			return yScale(d[1]);
        		});

        	// Drawing the axes on the plot 
        	xAxis.scale(xScale).orient('bottom').ticks(20);
        	yAxis.scale(yScale).orient('left').ticks(12);

        	plot.append('g')
        		.attr('class', 'axis')
        		.attr("transform", "translate(" + (padding) + ", 0)")
        		.call(yAxis);

        	plot.append('g')
        		.attr('class', 'axis')
        		.attr("transform", "translate(" + padding + "," + (height - padding) + ")")
        		.call(xAxis);


        });
      }
    };
  });
