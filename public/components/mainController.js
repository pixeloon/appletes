(function() {

    "use strict";

    angular.module("appletesApp")

    // Setup the filter
    // .filter('cardsByTags', function() {

    //     // Create the return function and set the required parameter name to **input**
    //     return function(input, tag) {

    //         var out = [];

    //         // Using the angular.forEach method, go through the array of data and perform the operation of figuring out if the language is statically or dynamically typed.
    //         angular.forEach(input, function(card) {

    //             if (card.selectedTags === tag) {
    //                 out.push(card)
    //             }

    //         })

    //         return out;
    //     }

    // })
    .controller("MainController", function($scope, $http, $mdSidenav, $timeout, $q, $mdToast, $mdDialog, WorkoutFactory, ExerciseFactory, TagFactory) {

        WorkoutFactory.getWorkouts().then(function(workouts) {
            $scope.view.workouts = workouts.data;
        });

        ExerciseFactory.getExercises().then(function(exercises) {
            $scope.view.exercises = exercises.data;
        });

        TagFactory.getTags().then(function(tags) {
            $scope.view.tagsData = tags.data;
            $scope.view.tags = loadTags();

        });

        window.iinerscope = $scope
        $scope.view =  {};
        $scope.view.workout = {};
        $scope.view.showImages = true;
        $scope.view.showComments = true;
        $scope.view.filteredWorkouts = "";

        $scope.view.exerciseCounter = 4;
        $scope.view.workoutCounter = 3;
        $scope.view.cardCounter = 0;
        $scope.view.showCards = true;
        $scope.view.selectedExercises = [];

        $scope.setWorkoutId = function() {
            $scope.view.workoutCounter += 1;
            $scope.view.workout.workoutId = $scope.view.workoutCounter;
            return $scope.view.workout.workoutId;
        }

        $scope.getWorkoutId = function() {
            return $scope.view.workout.workoutId;
        }

        $scope.submitWorkout = function(workout) {
            if (workout) {
                workout.workoutId = $scope.view.workoutCounter + 1
                workout.timestamp = Date.now();
                workout.comments = [];
                workout.image = "";
                workout.votes = 0;
                workout.comments = [];
                workout.selectedTags = $scope.view.selectedTags;
                $scope.view.workouts.push(workout)

                $scope.showToast('Workout added!');

            }
            $scope.closeRightNav();

        }

        $scope.toggleExercise = function(exercise) {

            if (exercise.selectedExercise) {
                if (!exercise.workoutId) {
                    exercise.workoutId = $scope.getWorkoutId();
                }
                $scope.view.selectedExercises.push(exercise)

                return exercise

            } else {
                var idAtIndex = $scope.view.selectedExercises.findIndex(function(el) {
                    return el.exerciseId === exercise.exerciseId;
                })
                $scope.view.selectedExercises.slice(idAtIndex, 1)
                return
            }


        }

        $scope.editWorkout = function(workout) {
            $scope.editing = true;

        }

        $scope.deleteWorkout = function(workout) {

        }

        $scope.addToFavs = function(workoutId) {


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

        // handling exercise add dialog
        $scope.showExerciseDialog = function(event) {
            $mdDialog.show({
                templateUrl: '/templates/exerciseDialog.html',
                scope: $scope.$new(),
                controller: 'ModalController',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: false
            })
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.showToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                .content(message)
                .position("top, right")
                .hideDelay(2500));

        }

        // handling tag chips
        $scope.view.selectedItem = null;
        $scope.view.searchText = null;
        $scope.view.querySearch = querySearch;
        $scope.view.selectedTags = [];
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

        // function loadTagsArr() {
        //     var tags = $scope.view.tagsData;
        //     var arr = [];
        //     return tags.map(function(tag) {
        //         arr.push(tag.name.toLowerCase())
        //         return arr;
        //     });
        // }


    })
    .controller('ModalController', function($scope){
      
      $scope.name = "FOO!!!"
        // ADD YOUR MODAL LOGIC!
    })

  


})();
