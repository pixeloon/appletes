(function() {

  "use strict";

  angular.module("appletesApp")
      .controller("MainController", function($scope) {
          $scope.view = {};
          $scope.view.cards = [{
              title: "Pushups",
              tags: ["endurance", "legs"],
              contributor: "workoutbee@gmail.com",
              imageUrl: "/images/Push-Ups.jpg",
              description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos architecto aliquid, dignissimos culpa quis quia amet nostrum esse suscipit vero, ullam molestias sequi fuga cumque. Aliquid molestias iusto, inventore provident.",
              votes: 5,
              timestamp: Date.now(),
              comments: ["nice workout", "this rocks"]
          },
          {
              title: "Pullups",
              tags: ["strength", "arms"],
              contributor: "workit@yahoo.com",
              imageUrl: "/images/pullup.jpg",
              description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos architecto aliquid, dignissimos culpa quis quia amet nostrum esse suscipit vero, ullam molestias sequi fuga cumque. Aliquid molestias iusto, inventore provident.",
              votes: 5,
              timestamp: Date.now(),
              comments: ["tough exercise", "this is hard"]
          }];

          $scope.submitPost = function() {
              $scope.view.cards.push({
                  cardId: $scope.view.cardCounter,
                  title: $scope.view.cardTitle,
                  contributor: $scope.view.cardContributor,
                  imageUrl: $scope.view.cardImageUrl,
                  description: $scope.view.cardDescription,
                  votes: 0,
                  timestamp: Date.now(),
                  comments: []
              });
          }


      });

})();
