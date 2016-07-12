(function() {

  "use strict";

  angular.module("appletesApp")
      .factory("TagFactory", function($http) {

        function getTags() {
          return $http.get('data/tags.json')
        }

        return {
          getTags: getTags
        }

      });

    })();