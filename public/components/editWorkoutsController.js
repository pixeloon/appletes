(function() {

  "use strict";

  angular
    .module('appletesApp')
    .controller('EditWorkoutsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout,WorkoutFactory) {

      var ctrl = this;

      // ctrl.closeSidebar = closeSidebar;
      // ctrl.saveEdit = saveEdit;

      // ctrl.sidebarTitle = 'Edit Workout';

      // ctrl.workout = $state.params.workout;

      // $timeout(function() {
      //   $mdSidenav('left').open();    
      // });

      // $scope.$watch('rightNavOpen', function(rightNavOpen) {
      //   if(rightNavOpen === false) {
      //     $mdSidenav('left')
      //       .close()
      //       .then(function() {
      //         $state.go('workouts');
      //     });
      //   }
      // });



      // watcher to handles state
      // function closeSidebar() {
      //   ctrl.workout = {};
      //   $scope.rightNavOpen = false;        
      // }

      // function saveEdit() {
      //   // Need to clear the form after
      //   $scope.rightNavOpen = false;
      //   // showToast('Edit Saved');
      //   $scope.$emit('editSaved', 'Edit Saved');
      // }


    });

})();