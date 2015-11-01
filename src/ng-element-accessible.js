(function (angular) {
    var myModule = angular.module('ngElementAccessible', []);

    myModule.constant('defaultConfig', {
        prev: '37,38',
        next: '39,40'
    });

    myModule.directive('ngElementAccessible', ['defaultConfig', function (defaultConfig) {
        return {
            restrict: 'EA',
            controller: ['$scope', function ($scope) {
                this.childElements = [];
                this.registerElement = function (childElement) {
                    this.childElements.push(childElement);
                    return (this.childElements.length - 1);
                };

                this.resetCounter = function (count) {
                    this.counter = count;
                };
                this.moveNext = function (count) {
                    this.counter = (this.counter + count) < this.maxLength ? this.counter + count : this.maxLength - 1;
                    this.moveFocus(this.counter);
                };
                this.movePrev = function (count) {
                    this.counter = (this.counter - count) > -1 ? this.counter - count : 0;
                    this.moveFocus(this.counter);
                };
                this.moveFocus = function (index) {
                    this.childElements[index][0].focus();
                };

                this.keyDownHandler = function (ev, count) {
                    if (angular.isDefined(count) && !isNaN(count) && count !== this.counter) {
                        this.resetCounter(count);
                    }
                    if (!ev.keyCode) {
                        if (ev.which) {
                            ev.keyCode = ev.which;
                        } else if (ev.charCode) {
                            ev.keyCode = ev.charCode;
                        }
                    }
                    if (ev.keyCode) {
                        if (this.prev.indexOf(ev.keyCode.toString()) > -1) {
                            this.movePrev(1);
                            ev.preventDefault();
                            ev.stopPropagation();
                        } else if (this.next.indexOf(ev.keyCode.toString()) > -1) {
                            this.moveNext(1);
                            ev.preventDefault();
                            ev.stopPropagation();
                        }
                    }
                };
            }],
            link: function (scope, elem, attr, ctrl) {
                ctrl.prev = attr.prev ? attr.prev.split(',') : defaultConfig.prev.split(',');
                ctrl.next = attr.next ? attr.next.split(',') : defaultConfig.next.split(',');
                ctrl.maxLength = ctrl.childElements.length;
                ctrl.counter = -1;

                elem.bind('keydown', function (ev) {
                    ctrl.keyDownHandler(ev, -1);
                });
            }
        };
    }]);

    myModule.directive('ngElementAccess', [function () {
        return {
            restrict: 'EA',
            link: function (scope, elem, attr, ctrl) {
                var parentCtrl = (elem.parent() && elem.parent().controller('ngElementAccessible')) || undefined;
                if (angular.isDefined(parentCtrl)) {
                    var count = parentCtrl.registerElement(elem);
                    elem.bind('keydown', function (ev) {
                        parentCtrl.keyDownHandler(ev, count);
                    });
                }
            }
        };
    }]);
})(angular);