(function() {

    "use strict";

    angular.module("appletesApp")
        .controller("MainController", function($scope, $http, $element, $mdSidenav, $timeout, $q, WorkoutFactory, ExerciseFactory) {

            WorkoutFactory.getWorkouts().then(function(workouts) {
                $scope.view.cards = workouts.data;
            });

            ExerciseFactory.getExercises().then(function(exercises) {
                $scope.view.exercises = exercises.data;
            });
            window.scope = $scope
            $scope.view = {};
            $scope.view.exerciseCounter = 4;
            $scope.view.workoutCounter = 0;
            $scope.view.cardCounter = 0;
            $scope.view.showCards = true;

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

            $scope.openRightNav = function() {
                $mdSidenav('right').open();
            };

            $scope.closeRightNav = function() {
                $mdSidenav('right').close();
            };

        })

    .controller('TagController', TagCtrl);

    function TagCtrl($timeout, $q) {
        var self = this;
        self.readonly = false;
        self.selectedItem = null;
        self.searchText = null;
        self.querySearch = querySearch;
        self.tags = loadTags();
        self.selectedTags = [];
        self.numberChips = [];
        self.numberChips2 = [];
        self.numberBuffer = '';
        self.autocompleteRequireMatch = true;
        self.transformChip = transformChip;
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
            var results = query ? self.tags.filter(createFilterFor(query)) : [];
            return results;
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(tag) {
                return (tag._lowername.indexOf(lowercaseQuery) === 0);
            };
        }

        function loadTags() {
            var tags = [{
                'name': 'endurance'
            }, {
                'name': 'strength'
            }, {
                'name': 'flexibility'
            }, {
                'name': 'arms'
            }, {
                'name': 'legs'
            }];
            return tags.map(function(tag) {
                tag._lowername = tag.name.toLowerCase();
                return tag;
            });
        }
    }





})();
