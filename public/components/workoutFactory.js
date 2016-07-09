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

      });

    })();