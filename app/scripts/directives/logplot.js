'use strict';

/**
 * @ngdoc directive
 * @name zipfApp.directive:logPlot
 * @description
 * # logPlot
 */
angular.module('zipfApp')
  .directive('logPlot', function() {

    // Plot dimensions and stuff 
    var width = 600,
      height = 500,
      xScale = d3.scale.log(),
      yScale = d3.scale.log(),
      xAxis = d3.svg.axis(),
      yAxis = d3.svg.axis(),
      padding = 50,
      dotRadius = 4,
      dotColor = '#002C7C';

    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.turnOffLogPlotDataListener = scope.$on('Plot_Data_Ready', function() {

          // Remove any of the left overs or the older plots
          d3.select(element[0]).selectAll('*').remove();

          var logPlotData = scope.wordCounts;

          // Setting up the scale and then the axes 
          yScale.domain([1, d3.max(logPlotData, function(d) {return d[1]; }) + 5]).range([height - padding, 0]);
          xScale.domain([1, logPlotData.length]).range([0, width - padding - 10]);

          var logPlot = d3.select(element[0])
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'realPlot');

          logPlot.selectAll('circle')
            .data(logPlotData)
            .enter()
            .append('circle')
            .attr('r', dotRadius)
            .attr('fill', dotColor)
            .attr('cx', function(d, i) {
              return xScale(i + 1) + padding + 2;
            })
            .attr('cy', function(d) {
              return yScale(d[1]) - (dotRadius / 2);
            });


          // Drawing the axes on the plot 
          xAxis.scale(xScale).orient('bottom').tickFormat('');
          yAxis.scale(yScale).orient('left').tickFormat('');

          logPlot.append('g')
            .attr('class', 'axis')
            .attr("transform", "translate(" + (padding) + ", 0)")
            .call(yAxis);

          logPlot.append('g')
            .attr('class', 'axis')
            .attr("transform", "translate(" + padding + "," + (height - padding) + ")")
            .call(xAxis);

          // Label for the x axis
          logPlot.append('text')
            .attr('class', 'axisLabel')
            .attr('x', width/2)
            .attr('y', height - 12)
            .text('log( Rank )');

          // Label for the y axis
          logPlot.append('text')
            .attr('class', 'axisLabel')
            .attr('text-anchor', 'end')
            .attr('x', -120)
            .attr('transform', 'rotate(-90)')
            .attr('y', 14)
            .text('log ( Frequency )');


        });
      }
    };
  });