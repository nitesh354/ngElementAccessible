(function (angular) {
    var myModule = angular.module('ngElementAccessible', []);

    myModule.constant('defaultConfig', {
        prev: '37,38',
        next: '39,40'
    });

    myModule.directive('ngElementAccessible', ['defaultConfig', function (defaultConfig) {
        return {
            restrict: 'EA',
            scope: {},
            controller: ['$scope', function ($scope) {
                $scope.childElements = this.childElements = [];
                this.registerElement = function (childElement) {
                    this.childElements.push(childElement);
                };
                this.resetCounter = function (childElement) {

                };
            }],
            link: function (scope, elem, attr, ctrl) {
                scope.prev = attr.prev ? attr.prev.split(',') : defaultConfig.prev.split(',');
                scope.next = attr.next ? attr.next.split(',') : defaultConfig.next.split(',');
                scope.maxLength = scope.childElements.length;
                scope.counter = -1;

                scope.moveNext = function (count) {

                };
                scope.movePrev = function (count) {

                };
                scope.moveFocus = function (index) {

                };

                elem.bind('keypress', function (ev) {

                });
            }
        };
    }]);

    myModule.directive('ngElementAccess', [function () {
        return {
            restrict: 'EA',
            require: '^ngElementAccessible',
            scope: {},
            link: function (scope, elem, attr, ctrl) {
                ctrl.registerElement(elem);
            }
        };
    }]);
})(angular);