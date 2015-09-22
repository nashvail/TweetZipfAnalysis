'use strict';

describe('Service: wordCountService', function () {

  // load the service's module
  beforeEach(module('zipfApp'));

  // instantiate service
  var wordCountService;
  beforeEach(inject(function (_wordCountService_) {
    wordCountService = _wordCountService_;
  }));

  it('should do something', function () {
    expect(!!wordCountService).toBe(true);
  });

});
