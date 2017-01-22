'use strict';

/**
 * @ngdoc overview
 * @name gutHubApp
 * @description
 * # gutHubApp
 *
 * Main module of the application.
 */
angular.module('guthub', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        resolve: {
          recipes: function (MultiRecipeLoader) {
            return MultiRecipeLoader();
          }
        }
      })
      .when('/edit/:_id', {
        templateUrl: 'views/recipeform.html',
        controller: 'EditCtrl',
        resolve: {
          recipe: function (RecipeLoader) {
            return RecipeLoader();
          }
        }
      })
      .when('/view/:_id', {
        templateUrl: 'views/viewrecipe.html',
        controller: 'ViewCtrl',
        resolve: {
          recipe: function (RecipeLoader) {
            return RecipeLoader();
          }
        }
      })
      .when('/new', {
        controller: 'NewCtrl',
        templateUrl: 'views/recipeform.html'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.hashPrefix('');
  });
