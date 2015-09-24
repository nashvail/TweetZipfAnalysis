'use strict';

/**
 * @ngdoc function
 * @name zipfApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zipfApp
 */
angular.module('zipfApp')
  .controller('MainCtrl', function($scope, $q, twitterService, wordCountService) {
    $scope.tweets; // array of tweets
    $scope.wordCounts; // array words with their usage counts [["the", 2], ["of", 1]...]
    twitterService.initialize();

    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
    $scope.refreshTimeline = function() {
      twitterService.getLatestTweets().then(function(data) {
        $scope.tweets = data;
        var wordCountsObject = wordCountService.getWordCounts(data);

        $scope.wordCounts = _.pairs(wordCountsObject);
        $scope.wordCounts.sort(function(a, b) { return b[1] - a[1]});

        // Tell that the data for the graph is ready
        $scope.$broadcast('Plot_Data_Ready');

      });
    }

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectToTwitter = function() {
      twitterService.connectTwitter().then(function() {
        if (twitterService.isReady()) {
          //if the authorization is successful, hide the connect button and display the tweets
          $('#connectButton').fadeOut(function() {
            $('#getTimelineButton, #signOut, #content').fadeIn();
            $scope.refreshTimeline();
          });
        }
      });
    }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
      twitterService.clearCache();
      $scope.tweets.length = 0;
      $('#getTimelineButton, #signOut, #content').fadeOut(function() {
        $('#connectButton').fadeIn();
      });
    }

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
      $('#connectButton').hide();
      $('#getTimelineButton, #signOut, #content').show();
      $scope.refreshTimeline();
    }

  });