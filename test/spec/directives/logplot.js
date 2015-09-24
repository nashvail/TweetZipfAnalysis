'use strict';

describe('Directive: logPlot', function () {

  // load the directive's module
  beforeEach(module('zipfApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<log-plot></log-plot>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the logPlot directive');
  }));
});
