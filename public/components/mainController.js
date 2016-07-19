(function() {

    "use strict";

    angular

        .module("appletesApp")

    .controller("MainController", function($scope, $http, $state, $mdSidenav, $timeout, $q, $mdToast, $mdDialog, WorkoutFactory, ExerciseFactory, TagFactory) {

            var ctrl = this;

            ctrl.addToFavs = addToFavs; // to do
            ctrl.cancel = cancel;
            ctrl.clearWorkout = clearWorkout; //to do
            ctrl.closeLeftNav = closeLeftNav;
            ctrl.closeRightNav = closeRightNav;
            ctrl.deleteWorkout = deleteWorkout; // to do
            ctrl.editWorkout = editWorkout; // to do
            ctrl.getWorkoutId = getWorkoutId;
            ctrl.openLeftNav = openLeftNav;
            ctrl.openRightNav = openRightNav;
            ctrl.setWorkoutId = setWorkoutId;
            ctrl.showExercises = showExercises;
            ctrl.showToast = showToast;
            ctrl.signOutUser = signOutUser;
            ctrl.sort = sort;
            ctrl.submitExercises = submitExercises;
            // ctrl.submitWorkout = submitWorkout;
            ctrl.saveWorkout = saveWorkout;
            ctrl.toggleExercise = toggleExercise;
            ctrl.voteDown = voteDown;
            ctrl.voteUp = voteUp;

            ctrl.saveWorkout = saveWorkout;


            WorkoutFactory.getWorkouts().then(function(workouts) {
                ctrl.workouts = workouts.data;
                console.log("WORKOUTS: ", ctrl.workouts)
            });

            ExerciseFactory.getExercises().then(function(exercises) {
                ctrl.exercises = exercises.data;
                console.log("EXERCISES: ", ctrl.exercises)
            });

            TagFactory.getTags().then(function(tags) {
                ctrl.tagsData = tags.data;
                ctrl.tags = loadTags();

            });

            $scope.$on('newWorkout', function(event, newWorkout) {
                newWorkout.workoutId = ctrl.getWorkoutId();
                ctrl.workouts.push(newWorkout);
                showToast('New Workout Saved');
            });

            $scope.$on('editSaved', function(event, message) {
                showToast(message);
            });


            window.mainscope = ctrl
            // ctrl = {};
            ctrl.newExercise = {};
            ctrl.newExercise.sets = [];
            ctrl.workout = {};
            ctrl.workout.sets = [];
            ctrl.showImages = true;
            ctrl.showComments = true;
            ctrl.filterWorkouts = false;
            ctrl.showSets = false;
            ctrl.showCards = true;
            ctrl.pickExercises = false;
            // ctrl.exerciseChecked = false;
            // ctrl.repsAdded = false;
            // ctrl.checked = false;

            ctrl.filteredWorkouts = "";
            ctrl.selectedTags = [];
            ctrl.exerciseCounter = 201;
            ctrl.workoutCounter = 101;
            ctrl.cardCounter = 0;
            ctrl.selectedExercises = [];

            ctrl.sortOption = "Date"
            ctrl.sortOptions = ["Date", "Votes"];
            ctrl.numbersSets = 0;
            ctrl.setNumber = 0;
            ctrl.exerciseReps = 10;

            function saveWorkout(workout) {

                let workoutId = ctrl.getWorkoutId();
                let tagsArr = [];
                let tagsObjArr = ctrl.selectedTags;
                tagsArr = tagsObjArr.map(function(item) {
                    return item = item.name

                })
                console.log("Ready to send:", workout)
                debugger

                firebase.database().ref('workouts/' + workout.workoutId).set({

                    name: workout.name,
                    selectedTags: tagsArr,
                    instructions: workout.instructions,

                    skill: ctrl.skillLevel,

                    sets: ctrl.newExercise.sets,
                    exerciseIds: ctrl.workout.exerciseIds,
                    contributor: ctrl.contributor,
                    image: "http://lorempixel.com/200/200/sports/",
                    instructions: workout.instructions,
                    votes: 0,
                    timestamp: Date.now(),
                    comments: []


                }).then(function() {
                    ctrl.showToast('Workout added!');
                    closeRightNav();

                })
            }


            function signOutUser() {
                firebase.auth().signOut().then(function() {
                    console.log("Signed out successfully!");
                }, function(error) {
                    console.log("Error occurred: ", error)
                });
            }

            function setWorkoutId() {
                ctrl.workoutCounter += 1;
                ctrl.workout.workoutId = ctrl.workoutCounter;

                return ctrl.workout.workoutId;
            }

            function getWorkoutId() {

                return ctrl.workout.workoutId;
            }

            function sort() {
                var option = ctrl.sortOption;

                if (option === "Votes") {
                    return "-votes"

                } else if (option === "Date") {
                    return "-timestamp"
                } else {

                    return "-timestamp"
                }
            }

            // function submitWorkout(workout) {
            // console.log("Submitted WO: ", workout);

            // if (workout) {
            //     if (!ctrl.contributor) {
            //         workout.contributor = "Anonymous"
            //     } else {
            //         //To Do
            //         workout.contributor = ctrl.contributor;
            //     }
            // workout.workoutId = ctrl.workoutCounter + 1
            // workout.timestamp = Date.now();
            // workout.skill = ctrl.skillLevel;
            // workout.comments = [];
            // workout.image = "";
            // workout.votes = 0;
            // workout.comments = [];
            // workout.selectedTags = ctrl.selectedTags;
            // ctrl.workouts.push(workout)

            // ctrl.showToast('Workout added!');

            // }
            // closeRightNav();
            // }


            function editWorkout(workout) {
                ctrl.editing = true;
                //To Do

            }

            function deleteWorkout(workout) {
                //To Do

            }

            function voteUp(card) {
                card.votes += 1;
                return card;

            }

            function voteDown(card) {
                card.votes -= 1;
                return card;
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
                    ctrl.workout.sets = ctrl.newExercise.sets;


                    console.log("workout full:", ctrl.workout);
                    console.log("EXSETS:", ctrl.newExercise.sets);

                    showToast('Exercises added!');
                }
                // uncheck any previously checked Ex
                ctrl.exercises.forEach(v => v.selectedExercise = false)

                ctrl.pickExercises = false;


            }

            function addToFavs(workoutId) {
                //ToDo

            }

            function clearWorkout() {
                //to do
            }

            // handling left and right nav slider
            function openRightNav() {
                // $mdSidenav('right').open();
                $state.go('workouts.new');
            };

            function closeRightNav() {
                $mdSidenav('right').close();
                ctrl.workout = {};
                ctrl.selectedTags = [];
                ctrl.numbersSets = 0
            };

            function openLeftNav() {
                $mdSidenav('left').open();
            };

            function closeLeftNav() {
                $mdSidenav('left').close();
            };

            // keep track of which set number we pick exercises for
            function showExercises(setNumber) {

                ctrl.setNumber = setNumber;

                // console.log("Current Set Number: ",ctrl.setNumber);
            }

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

            function toggleExercise(exercise) {
                console.log("Exercise Obj:", exercise)
                    // debugger

                if (exercise.selectedExercise) {


                    if (!exercise.workoutId) {
                        exercise.workoutId = ctrl.getWorkoutId();
                        // add current workout ID to selected exercise
                        exercise.workoutIds.push(exercise.workoutId)
                    }

                    if (exercise.selectedExercise && exercise.repsAdded) {
                        ctrl.newExercise.sets.push({
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
            ctrl.selectedTags = [];
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

                            ctrl.contributor = profile.displayName;
                            ctrl.mail = profile.email;
                            ctrl.photoUrl = profile.photoURL;
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




})();
