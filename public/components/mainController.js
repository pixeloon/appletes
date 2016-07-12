(function() {

    "use strict";

    angular.module("appletesApp")

    .controller("MainController", function($scope, $http, $element, $mdSidenav, $timeout, $q, $mdToast, WorkoutFactory, ExerciseFactory, TagFactory) {

        WorkoutFactory.getWorkouts().then(function(workouts) {
            $scope.view.workouts = workouts.data;
        });

        ExerciseFactory.getExercises().then(function(exercises) {
            $scope.view.exercises = exercises.data;
        });

        TagFactory.getTags().then(function(tags) {
            $scope.view.tagsData = tags.data;
            $scope.view.tags = loadTags();
            // $scope.view.tags = loadTags();
        });

        window.scope = $scope
        $scope.view = {};
        $scope.view.workout = {};
        $scope.view.showImage = false;

        $scope.view.exerciseCounter = 4;
        $scope.view.workoutCounter = 0;
        $scope.view.cardCounter = 0;
        $scope.view.showCards = true;

        $scope.submitWorkout = function(workout) {
          if (workout){
            workout.workoutId = $scope.view.workoutCounter + 1
            workout.timestamp = Date.now();
            workout.comments = [];
            workout.image = "";
            workout.votes = 0;
            workout.comments = [];
            workout.selectedTags = $scope.view.selectedTags;
            // workout.contributor: $scope.view.workoutContributor,
            $scope.view.workouts.push(workout)
            $mdToast.show(
              $mdToast.simple()
              .content('Workout added!')
              .position("top, right")
              .hideDelay(3000));

            
          }
            $scope.closeRightNav();

        }

        // handling left and right nav slider

        $scope.openRightNav = function() {
            $mdSidenav('right').open();
        };

        $scope.closeRightNav = function() {
            $mdSidenav('right').close();
            $scope.view.workout = {};
            $scope.view.selectedTags = [];
        };

        $scope.openLeftNav = function() {
            $mdSidenav('left').open();
        };

        $scope.closeLeftNav = function() {
            $mdSidenav('left').close();


        };

        // handling tag chips
        $scope.view.selectedItem = null;
        $scope.view.searchText = null;
        $scope.view.querySearch = querySearch;
        $scope.view.selectedTags = [];
        // $scope.view.numberBuffer = '';
        $scope.view.autocompleteRequireMatch = true;
        $scope.view.transformChip = transformChip;
        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { name: chip }
        }
        /**
         * Search for tags.
         */
        function querySearch(query) {
            var results = query ? $scope.view.tagsData.filter(createFilterFor(query)) : [];
            return results;
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(tag) {
                return (tag.name.indexOf(lowercaseQuery) === 0);
            };
        }

        function loadTags() {
            var tags = $scope.view.tagsData;

            return tags.map(function(tag) {
                tag.name = tag.name.toLowerCase();
                return tag;
            });
        }
        // }

    })



})();
