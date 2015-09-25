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
    $scope.wordCounts = []; // array words with their usage counts [["the", 2], ["of", 1]...]
    twitterService.initialize();

    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
    $scope.refreshTimeline = function() {
      twitterService.getLatestTweets().then(function(latestTweets) {
        $scope.tweets = latestTweets;
        wordCountService.getWordCounts(latestTweets).then(function(wordCountUnsorted) {
          $scope.wordCounts = _.pairs(wordCountUnsorted);
          $scope.wordCounts.sort(function(a, b) { return b[1] - a[1]});

          // Broadcast that the data is ready,
          // but we only want the listener to listen once so once broadcasted we will turn off the 
          // data listeners
          $scope.$broadcast('Plot_Data_Ready');
          $scope.turnOffLinearPlotDataListener();
          $scope.turnOffLogPlotDataListener();
        });
      });
    }

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectToTwitter = function() {
      twitterService.connectTwitter().then(function() {
        if (twitterService.isReady()) {
          //if the authorization is successful, hide the connect button and display the tweets
          $('#connectButton, #caution_copy').fadeOut(function() {
            $scope.refreshTimeline();
            $('#getTimelineButton, #signOut, #after_twitter_connect').fadeIn();
          });
        }
      });
    }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
      twitterService.clearCache();
      $scope.tweets.length = 0;
      $scope.wordCounts.length = 0;
      $('#getTimelineButton, #signOut, #after_twitter_connect').fadeOut(function() {
        $('#connectButton, #caution_copy').fadeIn();
      });
    }

    // if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
      $('#connectButton, #caution_copy').hide();
      $('#getTimelineButton, #signOut, #after_twitter_connect').show();
      $scope.refreshTimeline();
    }

  });