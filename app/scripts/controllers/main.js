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
    twitterService.initialize();

    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
    $scope.refreshTimeline = function() {
      twitterService.getLatestTweets().then(function(data) {
        $scope.tweets = data;
        var wordCounts = wordCountService.getWordCounts(data);
        console.log(wordCounts);  
      });
    }

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectToTwitter = function() {
      twitterService.connectTwitter().then(function() {
        if (twitterService.isReady()) {
          //if the authorization is successful, hide the connect button and display the tweets
          $('#connectButton').fadeOut(function() {
            $('#getTimelineButton, #signOut').fadeIn();
            $scope.refreshTimeline();
          });
        }
      });
    }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
      twitterService.clearCache();
      $scope.tweets.length = 0;
      $('#getTimelineButton, #signOut').fadeOut(function() {
        $('#connectButton').fadeIn();
      });
    }

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
      $('#connectButton').hide();
      $('#getTimelineButton, #signOut').show();
      $scope.refreshTimeline();
    }

  });