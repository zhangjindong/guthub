'use strict';

describe('Service: services', function () {
  // load the service's module
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
  });
  describe('MultiRecipeLoader', function () {

    var mockBackend, recipe, loader;
    beforeEach(inject(function (_$httpBackend_, Recipe, MultiRecipeLoader) {
      recipe = Recipe;
      mockBackend = _$httpBackend_;
      loader = MultiRecipeLoader;
    }));
    it('能否加载菜谱列表', function () {
      mockBackend.expectGET('/recipes').respond([{id: 1}, {id: 2}]);
      var recipes;

      var promise = loader();
      promise.then(function (rec) {
        recipes = rec;
      });
      expect(recipes).toBeUndefined();
      mockBackend.flush();
      expect(recipes).toEqualData([{id: 1}, {id: 2}]);
    });
  })
});
