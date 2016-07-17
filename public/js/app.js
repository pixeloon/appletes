angular.module('appletesApp', ['ngMaterial', 'ngMessages', 'ui.router'])
.config(function($mdThemingProvider, $stateProvider){

  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('red')

  $stateProvider
  .state('workouts', {
    url: '/workouts',
    templateUrl: '../templates/workouts.html',
    controller: 'MainController as ctrl'
  })

})




