'use strict';

/**
 * @ngdoc service
 * @name zipfApp.wordCountService
 * @description
 * # wordCountService
 * Returns an object containing words, and the number of times the words appear in a blob
 */
angular.module('zipfApp.services')
  .factory('wordCountService', function() {

    var rawTweetData;
    var wordCounts = {};

    // Assumes that rawTweetData is loaded 
    function processTweetsAndGetWordCounts() {
      // Retrieved tweet object have other data like timestamp, and user and RTs associated,
      // we just need the text of the tweet, that is what is stored in the varaible below 
      var tweetTexts = getTweetTextsFromTweetObjects();
      var tweetTextsBlob = removeMentionsHashTagsUrlsAndSymbols(tweetTexts.join(" ").toLowerCase());
      var words = tweetTextsBlob.split(" ");

      fillWordCounts(words);
    }

    function fillWordCounts(words) {
      words.forEach(function(word) {
        if( isValidWord(word) ) {
          if( wordCounts.hasOwnProperty(word) ) {
            wordCounts[word] += 1;
          } else {
            wordCounts[word] = 1;
          }
        } 
      });
    }

    function isValidWord(word) {
      return (word !== "");
    }

    function getTweetTextsFromTweetObjects() {
      return rawTweetData.map(function(tweetObject) {
        return tweetObject.text;
      });
    }

    function removeMentionsHashTagsUrlsAndSymbols(tweetTexts) {
      var regexMention = /@([a-z\d_]+)/ig;
      var regexHashTag = /#([a-z\d_]+)/ig;
      var regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/ig;
      var regexSymbols = /[-!$%^&*()_+|~=`{}\[\]:“”";'<>?,.\/]/g;

      return tweetTexts
            .replace(regexMention, "")
            .replace(regexHashTag, "")
            .replace(regexUrl, "")
            .replace(regexSymbols, "");
    }


    // Public API here
    return {
      getWordCounts: function(data) {
        rawTweetData = data;
        return new Promise(function(resolve, reject) {
          processTweetsAndGetWordCounts();
          resolve(wordCounts);
        });
      }
    };
  });