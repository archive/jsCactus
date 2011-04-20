describe("Cactus Specifications", function() {
    describe("when creating a mock from a object", function() {

        var cactus;
        var someObject;

        beforeEach(function() {
            cactus = new Cactus();

            someObject = {
                someFunction : function() {
                }
            };
        });

        it("the object members should be included in the mock", function() {
            var mock = cactus.createStubBasedOn(someObject);

            expect(mock.someFunction).toBeDefined();
        });

        it("the object members should be callable", function() {
            var mock = cactus.createStubBasedOn(someObject);

            mock.someFunction();
            expect(true).toBeTruthy();
        });

        it("it should be possible to set your own default stub function", function() {
            var callback = jasmine.createSpy();
            var mock = cactus.createStubBasedOn(someObject, callback);

            mock.someFunction();
            expect(callback).toHaveBeenCalled();
        });
    });

    describe("when creating a mock from a function", function() {

        var cactus;
        var SomeObject;

        beforeEach(function() {
            cactus = new Cactus();

            SomeObject = function() {
            };
            SomeObject.prototype.someFunction = function() {
            };
        });

        it("the function members should be included in the mock", function() {
            var mock = cactus.createStubBasedOn(SomeObject);

            expect(mock.someFunction).toBeDefined();
        });
    });

    describe("when creating a mock from a function which have private functions", function() {

        var cactus;
        var SomeObject;

        beforeEach(function() {
            cactus = new Cactus();

            SomeObject = function() {
            };
            SomeObject.prototype._somePrivateFunction = function() {
            };
        });

        it("the function members should be included in the mock", function() {
            var mock = cactus.createStubBasedOn(SomeObject);

            expect(mock._somePrivateFunction).toBeUndefined();
        });
    });

    describe("when creating a mock from a object which is in a inheritance", function() {

        var cactus;
        var SomeObject;

        beforeEach(function() {
            cactus = new Cactus();

            var SomeParentObject = function() {
            };
            SomeParentObject.prototype.someParentFunction = function() {
            };

            SomeObject = function() {
            };
            SomeObject.prototype = new SomeParentObject();
            SomeObject.prototype.someFunction = function() {
            };
        });

        it("the inherit members should not be included in the mock", function() {
            var someObject = new SomeObject();

            var mock = cactus.createStubBasedOn(someObject);

            expect(mock.someParentFunction).toBeUndefined();
        });
    });
});