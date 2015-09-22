'use strict';

/**
 * @ngdoc service
 * @name zipfApp.wordCountService
 * @description
 * # wordCountService
 * Returns an object containing words, and the number of times the words appear in a blob
*/
angular.module('zipfApp.services')
  .factory('wordCountService', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
    	getWordCounts : function(data) {
    		return {"this" : 1000, "it" : 500};
    	}
    };
  });
