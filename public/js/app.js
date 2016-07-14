angular.module('appletesApp', ['ngMaterial', 'ngMessages'])
.config(function($mdThemingProvider){

  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('red')
})




