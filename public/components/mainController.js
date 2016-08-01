(function() {

    "use strict";

    angular

        .module("appletesApp")

    .controller("MainController", function($scope, $http, $state, $mdSidenav, $timeout, $q, $mdToast, $mdDialog, $firebaseArray) {

            var ctrl = this;

            window.ctrl = ctrl;

            ctrl.signInUser = signInUser;
            ctrl.signOutUser = signOutUser;
            ctrl.reloadRoute = reloadRoute;

            ctrl.addComment = addComment;
            ctrl.addToFavs = addToFavs; // to do
            ctrl.cancel = cancel;
            ctrl.clearWorkout = clearWorkout; //to do
            ctrl.closeLeftNav = closeLeftNav;
            ctrl.closeRightNav = closeRightNav;
            ctrl.comment = {};
            ctrl.deleteWorkout = deleteWorkout; // to do
            ctrl.editWorkout = editWorkout; // to do
            ctrl.forceSignOut = true;
            ctrl.getWorkoutId = getWorkoutId;
            ctrl.openLeftNav = openLeftNav;
            ctrl.openRightNav = openRightNav;
            ctrl.showToast = showToast;
            ctrl.sort = sort;
            ctrl.voteDown = voteDown;
            ctrl.voteUp = voteUp;
            ctrl.workoutsRef = firebase.database().ref('workouts/')
            ctrl.workouts = $firebaseArray(ctrl.workoutsRef);

            ctrl.workoutsRef.on('value', function(workouts) {

                let workoutsVal = workouts.val()
                for (var key in workoutsVal) {

                    var obj = workoutsVal[key];
                    for (var prop in obj) {

                    }
                }

            });


            // SAVE NEW Workout, from newWorkoutsController
            $scope.$on('newWorkout', function(event, workout) {
                workout.workoutId = ctrl.getWorkoutId();
                workout.contributor = ctrl.contributor || "Anonymous";

                let tagsArr = [];
                let tagsObjArr = workout.selectedTags;
                tagsArr = tagsObjArr.map(function(item) {
                    return item = item.name;
                })

                workout.selectedTags = tagsArr;
                workout.contributor = ctrl.contributor;
                workout.votes = 0;
                workout.timestamp = Date.now();
                workout.comments = []
                if (!workout.instructions) {
                    workout.instructions = ""
                }
                if (!workout.image) {
                    workout.image = "http://lorempixel.com/200/200/sports/"
                }


                firebase.database().ref('workouts/' + workout.key).set({

                    name: workout.name,
                    sets: workout.numbersSets,
                    skillLevel: workout.skillLevel,
                    selectedTags: workout.selectedTags,
                    image: workout.image,
                    instructions: workout.instructions,
                    contributor: workout.contributor,
                    votes: workout.votes,
                    sets: workout.sets,
                    timestamp: workout.timestamp,
                    comments: workout.comments

                }).then(function() {
                    ctrl.showToast('Workout added!');
                    closeRightNav();

                })

            });

            function addComment(workout) {

                let comment = {};
                let workoutId = workout.$id;

                if (ctrl.contributor) {
                    comment.commenter = ctrl.contributor;
                    comment.profileImg = ctrl.photoUrl;
                } else {
                    comment.commenter = "Anonymous"
                    comment.profileImg = "/images/anon.png";
                }

                if (workout.comments) {
                    // don't post an empty string
                    if (workout.comment) {
                        workout.comment.text
                        comment.text = workout.comment.text;
                    } else {
                        return
                    }
                    comment.timestamp = firebase.database.ServerValue.TIMESTAMP;

                    workout.comments.push(comment);
                } else {
                    workout.comments = [{ "commenter": comment.commenter, "text": workout.comment.text, "timestamp": Date.now(), "profileImg": ctrl.photoUrl }]
                }
                workout.comments.forEach(comment => delete comment.$$hashKey);

                if (ctrl.text === "") {
                    return;
                }

                firebase.database().ref('workouts/' + workoutId).update({
                    comments: workout.comments
                });
            }


            //To Do
            $scope.$on('editSaved', function(event, message) {
                showToast(message);
            });


            ctrl.userAuthenticated = false;
            ctrl.showImages = true;
            ctrl.showComments = true;
            ctrl.filterWorkouts = false;
            ctrl.showSets = false;
            ctrl.showCards = true;
            ctrl.pickExercises = false;
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

                    showToast('Exercises added!');
                }
                // uncheck any previously checked Exercises
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
                if (ctrl.userAuthenticated) {

                    $state.go('workouts.new');
                } else {
                    showToast('To add workouts, please Login (requires Google Chrome)');
                }

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
                    // console.log("User available!")
                    ctrl.user = firebase.auth().currentUser;
                    ctrl.contributor, ctrl.email, ctrl.photoUrl, ctrl.uid;

                    if (user != null) {
                        user.providerData.forEach(function(profile) {
                            // console.log("Sign-in provider: " + profile.providerId);
                            // console.log("  Provider-specific UID: " + profile.uid);
                            // console.log("  Name: " + profile.displayName);
                            // console.log("  Email: " + profile.email);
                            // console.log("  Photo URL: " + profile.photoURL);

                            ctrl.contributor = profile.displayName;
                            ctrl.mail = profile.email;
                            ctrl.photoUrl = profile.photoURL;
                            ctrl.uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
                            // this value to authenticate with your backend server, if
                            // you have one. Use User.getToken() instead.
                            ctrl.userAuthenticated = true;
                            // ctrl.myUserId = firebase.auth().currentUser.uid
                        });

                    }

                } else {
                    console.log("No user available!")
                    ctrl.userAuthenticated = false;

                    if (ctrl.forceSignOut = false) {

                        firebase.auth().signInWithPopup(provider).then(function(result) {
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            ctrl.token = result.credential.accessToken;
                            // The signed-in user info.
                            ctrl.user = result.user;
                            console.log("Signed in automatically!");
                            // ...
                        }).catch(function(error) {
                            // Handle Errors here.
                            ctrl.errorCode = error.code;
                            ctrl.errorMessage = error.message;
                            // The email of the user's account used.
                            ctrl.errorEmail = error.email;
                            // The firebase.auth.AuthCredential type that was used.
                            ctrl.errorCredential = error.credential;
                            // ...
                        })

                    }
                }
            });

            function signInUser() {
                var provider = new firebase.auth.GoogleAuthProvider();
                $timeout(function() {
                    firebase.auth().signInWithPopup(provider)
                        .then(function(result) {
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            ctrl.token = result.credential.accessToken;
                            // The signed-in user info.
                            ctrl.user = result.user;
                            ctrl.contributor = result.displayName;
                            ctrl.myUserId = firebase.auth().currentUser.uid
                            ctrl.forceSignOut = false;
                            reloadRoute();

                            console.log("Signed in manually!");
                        }).catch(function(error) {
                            // Handle Errors here.
                            ctrl.errorCode = error.code;
                            ctrl.errorMessage = error.message;
                            // The email of the user's account used.
                            ctrl.email = error.email;
                            // The firebase.auth.AuthCredential type that was used.
                            ctrl.credential = error.credential;

                        });

                })
            }



            function signOutUser() {

                firebase.auth().signOut().then(function() {
                    ctrl.userAuthenticated = false;
                    ctrl.forceSignOut = true;
                    console.log("Signed out successfully!");
                }, function(error) {
                    console.log("Signout error occurred: ", error)
                });
            }

            function reloadRoute() {
                $state.reload();
            };


        }) // end main controller




})();