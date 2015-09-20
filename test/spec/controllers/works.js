'use strict';

describe('Controller: WorksCtrl', function () {

  // load the controller's module
  beforeEach(module('zipfApp'));

  var WorksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorksCtrl = $controller('WorksCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WorksCtrl.awesomeThings.length).toBe(3);
  });
});
