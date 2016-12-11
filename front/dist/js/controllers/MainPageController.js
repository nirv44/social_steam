angular.module('app.controllers')
.controller('MainPageController', function($scope, $rootScope, $location, services) {
  
  $rootScope.currentPage = 'main';
  $rootScope.user = services.getSteamUser($rootScope.userId);
  $rootScope.notifications = [
    { class: 'fa-exclamation-circle text-warning', text: '1 nouvelle notification par défaut', },
    { class: 'fa-user text-green', text: '1 nouvel ami en attente', },
    { class: 'fa-gamepad text-blue', text: '1 ami est en jeu', },
    { class: 'fa-steam text-gray', text: '1 nouveau jeu est sorti', }
  ];
  
});