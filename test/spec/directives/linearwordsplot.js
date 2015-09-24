'use strict';

describe('Directive: linearWordsPlot', function () {

  // load the directive's module
  beforeEach(module('zipfApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<linear-words-plot></linear-words-plot>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the linearWordsPlot directive');
  }));
});
