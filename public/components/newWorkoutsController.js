(function() {

    "use strict";

    angular
        .module('appletesApp')
        .controller('NewWorkoutsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout, ExerciseFactory, TagFactory) {

            var ctrl = this;

            $timeout(function() {
                $mdSidenav('right').open();

            })


            ctrl.closeRightNav = closeRightNav;
            ctrl.saveWorkout = saveWorkout;

            ctrl.toggleExercise = toggleExercise;
            ctrl.submitExercises = submitExercises;

            ExerciseFactory.getExercises().then(function(exercises) {
                ctrl.exercises = exercises.data;
                console.log("EXERCISES: ", ctrl.exercises)
            });

            TagFactory.getTags().then(function(tags) {
                ctrl.tagsData = tags.data;
                ctrl.tags = loadTags();

            });

            // some initial values
            ctrl.rightNavTitle = 'Add a Workout';
            ctrl.workout = {};
            ctrl.exercise = {};
            ctrl.workout.exercises = [];
            ctrl.workout.image = ""
            ctrl.workout.instructions = ""
            ctrl.skillLevels = ["Beginners", "Intermediates", "Advanced"];
            ctrl.workout.skillLevel = "Beginners";
            ctrl.workout.numbersSets = 1;
            ctrl.setNumber = 0;

            // ctrl.exercise.exerciseNumber
            // ctrl.exercise.exerciseNumber.sets;

            // handling sidenav state
            $scope.$watch('ctrl.rightNavOpen', function(rightNavOpen) {
                if (rightNavOpen === false) {
                    $mdSidenav('right')
                        .close()
                        .then(function() {
                            $state.go('workouts');
                        });
                }
            });

            // watcher handles state
            function closeRightNav() {
                ctrl.workout = {};
                ctrl.rightNavOpen = false;

            }

            function saveWorkout(workout) {
                if (workout) {

                    $scope.$emit('newWorkout', workout)
                    ctrl.rightNavOpen = false;
                }
            }

            // handling Exercises
            function submitExercises() {

                var selectedExercises = ctrl.selectedExercises;
                var workoutExerciseIds = [];

                if (selectedExercises) {
                    selectedExercises.forEach(function(ex) {
                        workoutExerciseIds.push(ex.exerciseId)

                    })
                    ctrl.workout.exerciseIds = workoutExerciseIds;
                    ctrl.workout.sets = ctrl.exercise.sets;


                    console.log("workout full:", ctrl.workout);
                    console.log("EXSETS:", ctrl.exercise.sets);

                    showToast('Exercises added!');
                }
                // uncheck any previously checked Ex
                ctrl.exercises.forEach(v => v.selectedExercise = false)

                ctrl.pickExercises = false;


            }

            function toggleExercise(exercise) {
                console.log("Exercise Obj:", exercise)
                    // debugger

                if (exercise.selectedExercise) {


                    // if (!exercise.workoutId) {
                    //     exercise.workoutId = ctrl.getWorkoutId();
                    //     // add current workout ID to selected exercise
                    //     exercise.workoutIds.push(exercise.workoutId)
                    // }

                    if (exercise.selectedExercise && exercise.repsAdded) {
                        ctrl.exercise.sets.push({
                            "number": ctrl.setNumber,
                            "exercise": [{
                                "exerciseId": exercise.exerciseId,
                                "name": exercise.name,
                                "image": exercise.image,
                                "reps": exercise.exerciseReps
                            }]
                        })
                        ctrl.selectedExercises.push(exercise)
                        return exercise

                    }


                } else {
                    // console.log("exercise.workoutId:", exercise.workoutId)
                    // var workoutIdAtIndex = exercise.workoutIds.findIndex(function(wid) {
                    //     return wid === exercise.workoutId
                    // })
                    // console.log("workoutIdAtIndex:", workoutIdAtIndex)
                    // console.log("workoutIds Array before:", exercise.workoutIds)
                    // exercise.workoutIds.splice(workoutIdAtIndex, 1)
                    // console.log("workoutIds Array after:", exercise.workoutIds)

                    var idAtIndex = ctrl.selectedExercises.findIndex(function(el) {
                        return el.exerciseId === exercise.exerciseId;
                    })
                    if (idAtIndex !== -1) {

                        ctrl.selectedExercises.splice(idAtIndex, 1)
                    }
                    return exercise
                }

            }


            // handling tag chips
            ctrl.selectedItem = null;
            ctrl.searchText = null;
            ctrl.querySearch = querySearch;
            ctrl.workout.selectedTags = [];
            ctrl.autocompleteRequireMatch = true;
            ctrl.transformChip = transformChip;
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
                var results = query ? ctrl.tagsData.filter(createFilterFor(query)) : [];
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
                var tags = ctrl.tagsData;
                return tags.map(function(tag) {
                    tag.name = tag.name.toLowerCase();
                    return tag;
                });
            }


        });

})();
