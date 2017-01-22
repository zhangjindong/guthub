'use strict';

/**
 * @ngdoc function
 * @name guthub.controller:ControllersCtrl
 * @description
 * # ControllersCtrl
 * Controller of the guthub
 */
angular.module('guthub')
  .controller('ListCtrl', ['$scope', 'recipes', function ($scope, recipes) {
    $scope.recipes = recipes;
  }])
  .controller('ViewCtrl', ['$scope', '$location', 'recipe', function ($scope, $location, recipe) {
    $scope.recipe = recipe;

    $scope.edit = function () {
      $location.path('/edit/' + recipe._id);
    }
  }])
  .controller('EditCtrl', ['$scope', '$location', 'recipe', function ($scope, $location, recipe) {
    $scope.recipe = recipe;
    $scope.save = function (recipe) {
      $scope.recipe.$save(function (recipe) {
        if(recipe.err){
         alert(recipe.err.errmsg)
        }else {
          $location.path('/view/' + recipe._id);
        }
      })
    };
    $scope.remove = function () {
      delete $scope.recipe;
      $location.path('/');
      // console.info("1")
    }
  }])
  .controller('NewCtrl', ['$scope', '$location', 'Recipe', function ($scope, $location, Recipe) {
    $scope.recipe = new Recipe({ingredients: [{}]});
    $scope.tlist=["diyiming","dierming","disanming"]
    $scope.save = function () {
      $scope.recipe.$save(function (recipe) {
        $location.path('/view/' + recipe._id);
      })
    }
  }])
  .controller('IngredientsCtrl', ['$scope', function ($scope) {
    $scope.addIngredient = function () {
      var ingredients = $scope.recipe.ingredients;
      ingredients[ingredients.length] = {};
    };
    $scope.removeIngredient = function (index) {
      $scope.recipe.ingredients.splice(index, 1);
    }
  }]);
