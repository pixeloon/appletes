(function() {

  "use strict";

  angular.module("appletesApp")
      .factory("MainFactory", function($http) {

        function getWorkouts() {
          return $http.get('data/workouts.json')
        }

        return {
          getWorkouts: getWorkouts
        }

      });

    })();