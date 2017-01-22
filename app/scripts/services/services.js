'use strict';

/**
 * @ngdoc service
 * @name guthub.services
 * @description
 * # services
 * Factory in the guthub.
 */
angular.module('guthub')
  .factory('Recipe', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/recipes/:_id', {_id: '@_id'}, {
      // get: {method: 'GET', cache: false, isArray: false},
      // query: {method: 'GET', cache: false, isArray: true},
      // save: {method: 'POST', cache: false, isArray: false},
      update: {method: 'PUT', cache: false, isArray: false},
      delete: {method: 'DELETE', cache: false, isArray: false}
    });
  }])
  .factory('MultiRecipeLoader', ['Recipe', '$q', function (Recipe, $q) {
    return function () {
      var delay = $q.defer();
      Recipe.query(function (recipes) {
        delay.resolve(recipes);
      }, function () {
        delay.reject('无法获取recipes列表');
      });
      return delay.promise;
    };
  }])
  .factory('RecipeLoader', ['Recipe', '$route', '$q', function (Recipe, $route, $q) {
    return function () {
      var delay = $q.defer();
      Recipe.get({_id: $route.current.params._id}, function (recipe) {
        delay.resolve(recipe);
      }, function () {
        delay.reject('无法获取recipe' + $route.current.params._id);
      });
      return delay.promise;
    };
  }]);
