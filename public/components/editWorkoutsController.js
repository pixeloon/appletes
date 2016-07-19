(function() {

  "use strict";

  angular
    .module('appletesApp')
    .controller('EditWorkoutsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout,WorkoutFactory) {

      var ctrl = this;

      ctrl.closeRightNav = closeRightNav;
      ctrl.saveEdit = saveEdit;

      ctrl.rightNavTitle = 'Edit Workout';

      ctrl.workout = $state.params.workout;

      $timeout(function() {
        $mdSidenav('right').open();    
      });

      $scope.$watch('rightNavOpen', function(rightNavOpen) {
        if(rightNavOpen === false) {
          $mdSidenav('right')
            .close()
            .then(function() {
              $state.go('workouts');
          });
        }
      });


      // watcher handles state
      function closeRightNav() {
        ctrl.workout = {};
        ctrl.rightNavOpen = false;        
      }

      function saveEdit() {
        //clear the form after
        ctrl.rightNavOpen = false;
        // showToast('Edit Saved');
        $scope.$emit('editSaved', 'Edit Saved');
      }


    });

})();