'use strict';

/**
 * @ngdoc directive
 * @name zipfApp.directive:logPlot
 * @description
 * # logPlot
 */
angular.module('zipfApp')
  .directive('logPlot', function () {

  	// Plot dimensions and stuff 
  	var width = 800,
			height = 600,
			xScale = d3.scale.log(),
			yScale = d3.scale.log(),
			xAxis = d3.svg.axis(),
			yAxis = d3.svg.axis(),
			padding = 30,
			dotRadius = 4;

    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	scope.$on('Plot_Data_Ready', function() {

      		// Remove any of the left overs or the older plots
      		d3.select(element[0]).selectAll('*').remove();

      		var logPlotData = scope.wordCounts;

      		// Setting up the scale and then the axes 
        	yScale.domain([ 1, d3.max( logPlotData, function(d) { return d[1];}) + 5]).range([height - padding, 0]);
        	xScale.domain([ 1 , logPlotData.length]).range([0, width - padding - 10]);

      		var logPlot = d3.select(element[0])
      			.append('svg')
      				.attr('width', width)
      				.attr('height', height);

					logPlot.selectAll('circle')
        		.data(logPlotData)
        		.enter()
        		.append('circle')
        		.attr('r', dotRadius)
        		.attr('fill', 'red')
        		.attr('cx', function(d, i) {
        			return xScale(i + 1) + padding + 2;
        		})
        		.attr('cy', function(d) {
        			return yScale(d[1]) - (dotRadius/2);
        		});


      		// Drawing the axes on the plot 
        	xAxis.scale(xScale).orient('bottom').tickFormat('').tickSize(0);
        	yAxis.scale(yScale).orient('left').tickFormat('').tickSize(0);

        	logPlot.append('g')
        		.attr('class', 'axis')
        		.attr("transform", "translate(" + (padding) + ", 0)")
        		.call(yAxis);

        	logPlot.append('g')
        		.attr('class', 'axis')
        		.attr("transform", "translate(" + padding + "," + (height - padding) + ")")
        		.call(xAxis);
      	});
      }
    };
  });
