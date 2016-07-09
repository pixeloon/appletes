(function() {

  "use strict";

  angular.module("appletesApp")
      .factory("ExerciseFactory", function($http) {

        function getExercises() {
          return $http.get('data/exercises.json')
        }

        return {
          getExercises: getExercises
        }

      });

    })();