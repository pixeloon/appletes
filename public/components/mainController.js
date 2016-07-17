(function() {

    "use strict";

    angular

        .module("appletesApp")

    .controller("MainController", function($scope, $http, $mdSidenav, $timeout, $q, $mdToast, $mdDialog, WorkoutFactory, ExerciseFactory, TagFactory) {

            var ctrl = this;

            ctrl.addToFavs = addToFavs; // to do
            ctrl.cancel = cancel;
            ctrl.closeLeftNav = closeLeftNav;
            ctrl.closeRightNav = closeRightNav;
            ctrl.deleteWorkout = deleteWorkout; // to do
            ctrl.editWorkout = editWorkout; // to do
            ctrl.getWorkoutId = getWorkoutId;
            ctrl.openLeftNav = openLeftNav;
            ctrl.openRightNav = openRightNav;
            ctrl.setWorkoutId = setWorkoutId;
            ctrl.showExerciseDialog = showExerciseDialog;
            ctrl.showToast = showToast;
            ctrl.signOutUser = signOutUser;
            ctrl.submitExercises = submitExercises;
            ctrl.submitWorkout = submitWorkout;
            ctrl.voteDown = voteDown;
            ctrl.voteUp = voteUp;

            //from factories
            // ctrl.view.workouts;
            // ctrl.view.exercises;
            // ctrl.view.tagsData;
            // ctrl.view.tags;

            WorkoutFactory.getWorkouts().then(function(workouts) {
                ctrl.view.workouts = workouts.data;
                console.log("WORKOUTS: ", ctrl.view.workouts)
            });

            ExerciseFactory.getExercises().then(function(exercises) {
                ctrl.view.exercises = exercises.data;
                console.log("EXERCISES: ", ctrl.view.exercises)
            });

            TagFactory.getTags().then(function(tags) {
                ctrl.view.tagsData = tags.data;
                ctrl.view.tags = loadTags();

            });





            window.mainscope = ctrl
            ctrl.view = {};
            ctrl.view.workout = {};
            ctrl.view.showImages = true;
            ctrl.view.showComments = true;
            ctrl.view.filterWorkouts = false;
            ctrl.view.filteredWorkouts = "";
            ctrl.view.selectedTags = [];

            ctrl.view.exerciseCounter = 4;
            ctrl.view.workoutCounter = 3;
            ctrl.view.cardCounter = 0;
            ctrl.view.showCards = true;
            ctrl.view.selectedExercises = [];


            function signOutUser() {
                debugger
                firebase.auth().signOut().then(function() {
                    console.log("Signed out successfully!");
                }, function(error) {
                    console.log("Error occurred: ", errror)
                });
            }

            function setWorkoutId() {
                ctrl.view.workoutCounter += 1;
                ctrl.view.workout.workoutId = ctrl.view.workoutCounter;
                return ctrl.view.workout.workoutId;
            }

            function getWorkoutId() {
                return ctrl.view.workout.workoutId;
            }

            function submitWorkout(workout) {
                if (workout) {
                    if (!workout.contributor) {
                        workout.contributor = "Anonymous"
                    } else {
                        //To Do
                        workout.contributor = $scope.currentUser;
                    }
                    workout.workoutId = $scope.view.workoutCounter + 1
                    workout.timestamp = Date.now();
                    workout.comments = [];
                    workout.image = "";
                    workout.votes = 0;
                    workout.comments = [];
                    workout.selectedTags = $scope.view.selectedTags;
                    ctrl.view.workouts.push(workout)

                    ctrl.showToast('Workout added!');

                }
                closeRightNav();

            }


            function editWorkout(workout) {
                ctrl.editing = true;
                //To Do

            }

            function deleteWorkout(workout) {
                //To Do

            }

            function voteUp(card) {
                card.votes += 1;
                console.log("Votes:", card.votes)
                return card;

            }

            function voteDown(card) {
                card.votes -= 1;
                console.log("Votes:", card.votes)
                return card;
            }

            // handling Exercises
            function submitExercises() {
              debugger
                var selectedExercises = ctrl.view.selectedExercises;
                var workoutExercises = [];
                // debugger
                if (selectedExercises) {
                    selectedExercises.forEach(function(ex) {
                        workoutExercises.push(ex.exerciseId)

                    })
                    ctrl.view.workout.exerciseIds = workoutExercises;
                    showToast('Exercises added!');
                }
                cancel()

            }

            function addToFavs(workoutId) {
                //ToDo

            }

            // handling left and right nav slider
            function openRightNav() {
                $mdSidenav('right').open();
            };

            function closeRightNav() {
                $mdSidenav('right').close();
                ctrl.view.workout = {};
                ctrl.view.selectedTags = [];
            };

            function openLeftNav() {
                $mdSidenav('left').open();
            };

            function closeLeftNav() {
                $mdSidenav('left').close();
            };

            // handling exercise add dialog
            function showExerciseDialog(event) {
                $mdDialog.show({
                    templateUrl: '/templates/exerciseDialog.html',
                    scope: $scope.$new(),
                    controller: 'ModalController',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: false
                })
            };

            function cancel() {
                $mdDialog.cancel();
            };

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position("top, right")
                    .hideDelay(2500));

            }

            // handling tag chips
            ctrl.view.selectedItem = null;
            ctrl.view.searchText = null;
            ctrl.view.querySearch = querySearch;
            ctrl.view.selectedTags = [];
            ctrl.view.autocompleteRequireMatch = true;
            ctrl.view.transformChip = transformChip;
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
                var results = query ? ctrl.view.tagsData.filter(createFilterFor(query)) : [];
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
                var tags = ctrl.view.tagsData;
                return tags.map(function(tag) {
                    tag.name = tag.name.toLowerCase();
                    return tag;
                });
            }

// AUTHENTICATION

            var provider = new firebase.auth.GoogleAuthProvider();



            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    console.log("User available!")
                    var user = firebase.auth().currentUser;
                    var name, email, photoUrl, uid;

                    if (user != null) {
                        user.providerData.forEach(function(profile) {
                            console.log("Sign-in provider: " + profile.providerId);
                            console.log("  Provider-specific UID: " + profile.uid);
                            console.log("  Name: " + profile.displayName);
                            console.log("  Email: " + profile.email);
                            console.log("  Photo URL: " + profile.photoURL);

                            ctrl.view.contributor = profile.displayName;
                            ctrl.view.mail = profile.email;
                            ctrl.view.photoUrl = profile.photoURL;
                            uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
                            // this value to authenticate with your backend server, if
                            // you have one. Use User.getToken() instead.
                        });
                    }


                } else {
                    console.log("No user available!")
                    firebase.auth().signInWithPopup(provider).then(function(result) {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        var token = result.credential.accessToken;
                        // The signed-in user info.
                        var user = result.user;
                        // ...
                    }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    })
                }
            });



        }) // end main controller

        .controller('ModalController', function($scope) {

            window.innerscope = $scope

            $scope.toggleExercise = function(exercise) {
                console.log("Exercise Obj:", exercise)

                if (exercise.selectedExercise) {
                    if (!exercise.workoutId) {
                        exercise.workoutId = ctrl.getWorkoutId();
                    }
                    // add current workout ID to selected exercise
                    exercise.workoutIds.push(exercise.workoutId)
                    ctrl.view.selectedExercises.push(exercise)

                    return exercise

                } else {
                    console.log("exercise.workoutId:", exercise.workoutId)
                    var workoutIdAtIndex = exercise.workoutIds.findIndex(function(wid) {
                        return wid === exercise.workoutId
                    })
                    console.log("workoutIdAtIndex:", workoutIdAtIndex)
                    console.log("workoutIds Array before:", exercise.workoutIds)
                    exercise.workoutIds.splice(workoutIdAtIndex, 1)
                    console.log("workoutIds Array after:", exercise.workoutIds)

                    var idAtIndex = ctrl.view.selectedExercises.findIndex(function(el) {
                        return el.exerciseId === exercise.exerciseId;
                    })
                    ctrl.view.selectedExercises.splice(idAtIndex, 1)


                    return exercise
                }

            }

        }) // end modal controller





})();
