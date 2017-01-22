'use strict';

/**
 * @ngdoc directive
 * @name guthub.directive:directives
 * @description
 * # directives
 */
angular.module('guthub')
  .directive('butterbar', ['$rootScope', function ($rootScope) {
    return {
      link: function (scope, element, attrs) {
        element.addClass('hide');
        $rootScope.$on('$routeChangeStart', function () {
          element.removeClass('hide');
        });
        $rootScope.$on('$routeChangeSuccess', function () {
          element.addClass('hide');
        })
      }
    };
  }])
  .directive('focus', function () {
    return {
      link: function postLink(scope, element, attrs) {
        console.info("****link" + attrs.focus)
        element[0].focus();
      },
      compile: function (tElement, tAttrs, transclude) {
        tElement[0].classList.add("list-group-item-success")
        console.info("****compile")
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            console.info("****compile>>preLink" + iAttrs.focus)
          },
          post: function postLink(scope, iElement, iAttrs, controller) {
            console.info("****compile>>postLink" + iAttrs.focus)
          }
        }
      }
    }
  });
