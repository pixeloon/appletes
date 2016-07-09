(function() {

    "use strict";

    angular.module("appletesApp")
        .controller("MainController", function($scope, $http, MainFactory) {
            MainFactory.getWorkouts().then(function(workouts) {
                $scope.view.cards = workouts.data;
            });

            $scope.view = {};
            $scope.view.exerciseCounter = 4;
            $scope.view.workoutCounter = 0;
            $scope.view.cardCounter = 0;
            $scope.view.showCards = true;
            $scope.view.showNewWorkoutForm = false;
            $scope.view.exerciseList = [];

            // $scope.view.cards = [{
            //     title: "Hulk",
            //     tags: ["endurance", "arms", "upper body"],
            //     contributor: "workoutbee@gmail.com",
            //     imageUrl: "/images/Push-Ups.jpg",
            //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos architecto aliquid, dignissimos culpa quis quia amet nostrum esse suscipit vero, ullam molestias sequi fuga cumque. Aliquid molestias iusto, inventore provident.",
            //     votes: 5,
            //     timestamp: Date.now(),
            //     comments: ["nice workout", "this rocks"]
            // },
            // {
            //     title: "Wonder Woman",
            //     tags: ["endurance", "strength", "back", "legs", "plyometric"],
            //     contributor: "workit@yahoo.com",
            //     imageUrl: "/images/pullup.jpg",
            //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos architecto aliquid, dignissimos culpa quis quia amet nostrum esse suscipit vero, ullam molestias sequi fuga cumque. Aliquid molestias iusto, inventore provident.",
            //     votes: 5,
            //     timestamp: Date.now(),
            //     comments: ["tough exercise", "this is hard"]
            // }];

            // $scope.view.workouts = [{
            //     title: "Hulk",
            //     tags: ["endurance", "arms", "upper body"],
            //     contributor: "workoutbee@gmail.com",
            //     exercises: [1,2],
            //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos architecto aliquid, dignissimos culpa quis quia amet nostrum esse suscipit vero, ullam molestias sequi fuga cumque. Aliquid molestias iusto, inventore provident.",
            //     votes: 5,
            //     timestamp: Date.now(),
            //     comments: ["nice workout", "this rocks"]
            // },
            // {
            //     title: "Wonder Woman",
            //     tags: ["endurance", "strength", "back", "legs", "plyometric"],
            //     contributor: "workit@yahoo.com",
            //     exercises: [2,3],
            //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos architecto aliquid, dignissimos culpa quis quia amet nostrum esse suscipit vero, ullam molestias sequi fuga cumque. Aliquid molestias iusto, inventore provident.",
            //     votes: 5,
            //     timestamp: Date.now(),
            //     comments: ["tough exercise", "this is hard"]
            // }];
            // EXERCISES
            $scope.view.exercises = [{
                exerciseId: 1,
                name: "Pushups",
                tags: ["endurance", "upper body"],
                image: "/images/Push-Ups.jpg",
                videoUrl: "",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos architecto aliquid, dignissimos culpa quis quia amet nostrum esse suscipit vero, ullam molestias sequi fuga cumque. Aliquid molestias iusto, inventore provident.",
                timestamp: Date.now(),

            }, {
                exerciseId: 2,
                name: "Pullups",
                tags: ["strength", "arms"],
                contributor: "",
                image: "/images/pullup.jpg",
                videoUrl: "",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos architecto aliquid, dignissimos culpa quis quia amet nostrum esse suscipit vero, ullam molestias sequi fuga cumque. Aliquid molestias iusto, inventore provident.",
                timestamp: Date.now(),
            }, {
                exerciseId: 3,
                name: "Jumpingjacks",
                tags: ["endurance, legs", "shoulders"],
                contributor: "",
                image: "/images/jumpingjack.jpg",
                videoUrl: "",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos architecto aliquid, dignissimos culpa quis quia amet nostrum esse suscipit vero, ullam molestias sequi fuga cumque. Aliquid molestias iusto, inventore provident.",
                timestamp: Date.now(),
            }];


            $scope.view.tags = [{ name: "endurance" }, { name: "strength" }, { name: "flexibility" },
                { name: "upper body" }, { name: "lower body" }, { name: "arms" }, { name: "legs" }, { name: "shoulders" },
                { name: "front" }, { name: "back" }, { name: "static" }, { name: "plyometric" }
            ]

            $scope.submitWorkout = function() {
                $scope.view.workouts.push({
                    workoutId: $scope.view.workoutCounter,
                    title: $scope.view.workoutTitle,
                    contributor: $scope.view.workoutContributor,
                    image: $scope.view.workoutImage,
                    description: $scope.view.workoutDescription,
                    exercises: [$scope.view.exerciseList],
                    timestamp: Date.now(),
                    comments: []
                });
            }


        });

})();
