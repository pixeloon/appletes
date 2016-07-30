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
            controller: 'NewWorkoutsController as ctrl',
            resolve: {
                security: ['$q', function($q) {
                    if ( ctrl.userAuthenticated === false ) {
                        return $q.reject("Not Authorized");
                    }
                }]
            }
        })

    })
