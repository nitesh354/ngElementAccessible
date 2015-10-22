describe('ng-element-accessible', function () {
    var scope, compile;

    beforeEach(module('ngElementAccessible'));
    beforeEach(inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_;
        compile = _$compile_;
    }));
});