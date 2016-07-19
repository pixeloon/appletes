(function() {

    "use strict";

    angular
        .module('appletesApp')
        .controller('NewWorkoutsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout, WorkoutFactory) {

            var ctrl = this;

            $timeout(function() {
                $mdSidenav('right').open();

            })


            ctrl.closeRightNav = closeRightNav;
            ctrl.saveWorkout = saveWorkout;

            ctrl.skillLevel = "Beginners"
            ctrl.skillLevels = ["Beginners", "Intermediates", "Advanced"]

            ctrl.rightNavTitle = 'Add a Workout';

            // handling sidenav state
            $scope.$watch('ctrl.rightNavOpen', function(rightNavOpen) {
                if (rightNavOpen === false) {
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

            function saveWorkout(workout) {
                if (workout) {

                    $scope.$emit('newWorkout', workout)
                    ctrl.rightNavOpen = false;
                }
            }


        });

})();
