'use strict';

describe('Controller: 控制器测试', function () {
  var $scope, ctrl;
  // load the controller's module
  beforeEach(module('guthub'));
  beforeEach(function () {
    jasmine.addMatchers({
      toEqualData: function () {
        return {
          compare: function (actual, expected) {
            return {pass: angular.equals(actual, expected)};
          }
        }
      }
    });
  })
//  lsit ctrl
  describe('ListCtrl', function () {
    var mockBackend, recipe;
    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, Recipe) {
      recipe = Recipe;
      mockBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      ctrl = $controller('ListCtrl', {
        $scope: $scope,
        recipes: [1, 2, 3]
      })
    }));
    it('菜谱列表显示', function () {
      expect($scope.recipes).toEqual([1, 2, 3]);
    })
  });

  //  Edit ctrl
  describe('EditCtrl', function () {
    var mockBackend, location;
    beforeEach(inject(function ($rootScope, $controller, _$httpBackend_, $location, Recipe) {
      location = $location;
      mockBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      ctrl = $controller('EditCtrl', {
        $scope: $scope,
        $location: $location,
        recipe: new Recipe({id: 1, title: 'Recipe'})
      })
    }));
    it('是否保存菜谱', function () {
      mockBackend.expectPOST('/recipes/1', {id: 1, title: 'Recipe'}).respond({id: 2});
      location.path('test');
      $scope.save();
      expect(location.path()).toEqual('/test');
      mockBackend.flush();
      expect(location.path()).toEqual('/view/2');
    });

    it('是否删除菜谱', function () {
      expect($scope.recipe).toBeTruthy();
      location.path('test');
      $scope.remove();
      expect($scope.recipe).toBeUndefined();
      expect(location.path()).toEqual('/');

    })
  });
});
