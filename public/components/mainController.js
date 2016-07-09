(function() {

    "use strict";

    angular.module("appletesApp")
        .controller("MainController", function($scope, $http, WorkoutFactory, ExerciseFactory, $element) {
            WorkoutFactory.getWorkouts().then(function(workouts) {
                $scope.view.cards = workouts.data;
            });

            ExerciseFactory.getExercises().then(function(exercises) {
                $scope.view.exercises = exercises.data;
            });

            $scope.view = {};
            $scope.view.exerciseCounter = 4;
            $scope.view.workoutCounter = 0;
            $scope.view.cardCounter = 0;
            $scope.view.showCards = true;
            $scope.view.showNewWorkoutForm = false;
            // $scope.view.exerciseList = [];


            $scope.view.tags = ['strength', 'endurance', 'flexibility', 'arms', 'legs', 'chest'];
            $scope.searchTerm;
            $scope.clearSearchTerm = function() {
                $scope.searchTerm = '';
            };
            // disabling md-select directive's quick select functionality since we have a search input 
            $element.find('input').on('keydown', function(ev) {
                ev.stopPropagation();
            });

           

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
