'use strict';

describe('Directive: directives', function () {

  // load the directive's module
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
  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('指令butterbar是否正常', inject(function ($compile,$rootScope) {
  //   element = angular.element('<butterbar>123</butterbar>');
  //   element = $compile(element)(scope);
  //
  //   expect(element.text()).toBe('123');
  //   expect(element.attr('class')).toContain('hide');
  //   console.info(element.attr('class'));
  //   $rootScope.route
  //   expect(element.attr('class')).not.toContain('hide');
  //   console.info(element.attr('class'));
  //   $rootScope.triggerHandler("$routeChangeSuccess");
  //   expect(element.attr('class')).toContain('hide');
  //   console.info(element.attr('class'))
  // }));
});
