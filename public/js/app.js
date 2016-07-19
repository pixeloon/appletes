angular.module('appletesApp', ['ngMaterial', 'ngMessages', 'ui.router', 'firebase', 'flow'])
    .config(function($mdThemingProvider, $stateProvider, $urlRouterProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red')

        $urlRouterProvider.otherwise('/workouts');

        $stateProvider
            .state('workouts', {
                url: '/workouts',
                templateUrl: '../templates/workouts.html',
                controller: 'MainController as ctrl'
            })

        .state('workouts.new', {
                url: '/new',
                templateUrl: '../templates/workouts_new.html',
                controller: 'NewWorkoutsController as ctrl'
            })
        .state('classifieds.edit', {
                url: '/:id/edit',
                templateUrl: '../templates/workouts_edit.html',
                controller: 'EditWorkoutsController as ctrl',
                params: {
                  classified: null
                }
            });


    })