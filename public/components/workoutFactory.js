(function() {

  "use strict";

  angular.module("appletesApp")
      .factory("WorkoutFactory", function($http) {

        function getWorkouts() {
          return $http.get('data/workouts.json')
        }
        return {
          getWorkouts: getWorkouts
        }
        // var ref = new Firebase('https://project-5928931587527197811.firebaseio.com/');

        // return {
        //   ref: $firebaseArray(ref)
        // }


      });

    })();