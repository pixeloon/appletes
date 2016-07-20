(function() {

    "use strict";

    angular.module("appletesApp")
        .factory("WorkoutFactory", function($http, $firebaseArray) {

            // for local GET
            //***************
            // function getWorkouts() {
            //     return $http.get('data/workouts.json')
            // }
            // return {
            //     getWorkouts: getWorkouts
            // }


            // get all workouts

            firebase.database().ref('workouts/').on('value', function(workout) {
                console.log("Workout Value: ", workout)
                    // return {
                    //   ref: $firebaseArray(ref)
                    // }
            });

            return {"test":"TESTING"}


        });

})();
