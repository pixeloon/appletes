(function() {

    "use strict";

    angular

        .module("appletesApp")

    .controller("MainController", function($scope, $http, $state, $mdSidenav, $timeout, $q, $mdToast, $mdDialog, WorkoutFactory) {

            var ctrl = this;

            ctrl.signInUser = signInUser;
            ctrl.signOutUser = signOutUser;

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

            ctrl.showExercises = showExercises;
            ctrl.showToast = showToast;
            // ctrl.signOutUser = signOutUser;
            ctrl.sort = sort;

            // ctrl.submitWorkout = submitWorkout;
            // ctrl.saveWorkout = saveWorkout;

            ctrl.voteDown = voteDown;
            ctrl.voteUp = voteUp;

            // ctrl.saveWorkout = saveWorkout;
            ctrl.workoutId;


            WorkoutFactory.getWorkouts().then(function(workouts) {
                ctrl.workouts = workouts.data;
                console.log("WORKOUTS: ", ctrl.workouts)
            });



            $scope.$on('newWorkout', function(event, workout) {
                // ctrl.workoutId = ctrl.getWorkoutId();
                // ctrl.workouts.push(workout);
                // showToast('New Workout Saved');
                workout.workoutId = ctrl.getWorkoutId();

                let tagsArr = [];
                let tagsObjArr = workout.selectedTags;
                tagsArr = tagsObjArr.map(function(item) {
                    return item = item.name;

                })

                workout.selectedTags = tagsArr;
                workout.contributor = ctrl.contributor;
                workout.votes = 0;
                workout.timestamp = Date.now();
                workout.comments = [];
                console.log("Ready to send:", workout)
                

                firebase.database().ref('workouts/' + workout.workoutId).set({

                    workout: workout

                }).then(function() {
                    ctrl.showToast('Workout added!');
                    closeRightNav();

                })

            });

            $scope.$on('editSaved', function(event, message) {
                showToast(message);
            });


            window.mainscope = ctrl
                // ctrl = {};
                // ctrl.exercise = {};
                // ctrl.exercise.sets = [];
                // ctrl.workout = {};
                // ctrl.workout.sets = [];
            ctrl.userAuthenticated = false;
            ctrl.showImages = true;
            ctrl.showComments = true;
            ctrl.filterWorkouts = false;
            ctrl.showSets = false;
            ctrl.showCards = true;
            ctrl.pickExercises = false;
            // ctrl.exerciseChecked = false;

            ctrl.filteredWorkouts = "";

            ctrl.exerciseCounter = 201;
            ctrl.workoutCounter = 101;
            ctrl.cardCounter = 0;
            ctrl.selectedExercises = [];

            ctrl.sortOption = "Date"
            ctrl.sortOptions = ["Date", "Votes"];


            ctrl.exerciseReps = 10;

            function getWorkoutId() {
                return ctrl.workoutCounter += 1;
            }


            // function saveWorkout(workout) {

            //     let workoutId = ctrl.getWorkoutId();
            //     let tagsArr = [];
            //     let tagsObjArr = ctrl.selectedTags;
            //     tagsArr = tagsObjArr.map(function(item) {
            //         return item = item.name

            //     })
            //     console.log("Ready to send:", workout)
            //     debugger

            //     firebase.database().ref('workouts/' + workout.workoutId).set({

            //         name: workout.name,
            //         selectedTags: tagsArr,
            //         instructions: workout.instructions,

            //         skill: ctrl.skillLevel,

            //         sets: ctrl.exercise.sets,
            //         exerciseIds: ctrl.workout.exerciseIds,
            //         contributor: ctrl.contributor,
            //         image: "http://lorempixel.com/200/200/sports/",
            //         instructions: workout.instructions,
            //         votes: 0,
            //         timestamp: Date.now(),
            //         comments: []


            //     }).then(function() {
            //         ctrl.showToast('Workout added!');
            //         closeRightNav();

            //     })
            // }






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
                    ctrl.workout.sets = ctrl.exercise.sets;


                    console.log("workout full:", ctrl.workout);
                    console.log("EXSETS:", ctrl.exercise.sets);

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




            // AUTHENTICATION

            var provider = new firebase.auth.GoogleAuthProvider();



            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    console.log("User available!")
                    ctrl.user = firebase.auth().currentUser;
                    ctrl.name, ctrl.email, ctrl.photoUrl, ctrl.uid;

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
                            ctrl.uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
                            // this value to authenticate with your backend server, if
                            // you have one. Use User.getToken() instead.
                        });

                        ctrl.userAuthenticated = true;
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

            function signInUser() {
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    ctrl.token = result.credential.accessToken;
                    // The signed-in user info.
                    ctrl.user = result.user;

                    console.log("Signed out successfully!");
                }).catch(function(error) {
                    // Handle Errors here.
                    ctrl.errorCode = error.code;
                    ctrl.errorMessage = error.message;
                    // The email of the user's account used.
                    ctrl.email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    ctrl.credential = error.credential;

                });
            }


            function signOutUser() {
                firebase.auth().signOut().then(function() {
                    ctrl.userAuthenticated = false;
                    console.log("Signed out successfully!");
                }, function(error) {
                    console.log("Error occurred: ", error)
                });
            }






        }) // end main controller




})();
