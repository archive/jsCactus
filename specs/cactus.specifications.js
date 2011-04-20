describe("Cactus Specifications", function() {
    describe("when creating a stub from a object", function() {

        var cactus;
        var someObject;

        beforeEach(function() {
            cactus = new Cactus();

            someObject = {
                someFunction : function() {
                }
            };
        });

        it("the object functions should be included in the stub", function() {
            var stub = cactus.createStubBasedOn(someObject);

            expect(stub.someFunction).toBeDefined();
        });

        it("the object functions should be callable", function() {
            var stub = cactus.createStubBasedOn(someObject);

            stub.someFunction();
            expect(true).toBeTruthy();
        });

        it("it should be possible to set your own default stub function", function() {
            var callback = jasmine.createSpy();
            var stub = cactus.createStubBasedOn(someObject, callback);

            stub.someFunction();
            expect(callback).toHaveBeenCalled();
        });
    });

    describe("when creating a stub from a function", function() {

        var cactus;
        var SomeObject;

        beforeEach(function() {
            cactus = new Cactus();

            SomeObject = function() {
            };
            SomeObject.prototype.someFunction = function() {
            };
        });

        it("the function functions should be included in the stub", function() {
            var stub = cactus.createStubBasedOn(SomeObject);

            expect(stub.someFunction).toBeDefined();
        });
    });

    describe("when creating a stub from a function which have private functions", function() {

        var cactus;
        var SomeObject;

        beforeEach(function() {
            cactus = new Cactus();

            SomeObject = function() {
            };
            SomeObject.prototype._somePrivateFunction = function() {
            };
        });

        it("the private functions should be not be included in the stub", function() {
            var stub = cactus.createStubBasedOn(SomeObject);

            expect(stub._somePrivateFunction).toBeUndefined();
        });
    });

    describe("when creating a stub from a object which is in a inheritance", function() {

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

        it("the inherit functions should not be included in the stub", function() {
            var someObject = new SomeObject();

            var stub = cactus.createStubBasedOn(someObject);

            expect(stub.someParentFunction).toBeUndefined();
        });
    });

    describe("when creating a stub from a object", function() {

        var cactus;
        var SomeObject;

        beforeEach(function() {
            cactus = new Cactus();

            SomeObject = function() { };
            SomeObject.prototype.someNumberLiteral = 1;
            SomeObject.prototype.someStringLiteral = "x";
            SomeObject.prototype.someArray = [1,2];
            SomeObject.prototype.someObject = {x:function(){}};
            SomeObject.prototype.somebool = true;
        });

        it("all number literals should return zero", function() {
            var stub = cactus.createStubBasedOn(SomeObject);

            expect(stub.someNumberLiteral).toBe(0);
        });

        it("all string literals should return empty string", function() {
            var stub = cactus.createStubBasedOn(SomeObject);

            expect(stub.someStringLiteral).toBe("");
        });

        it("all array should return empty array", function() {
            var stub = cactus.createStubBasedOn(SomeObject);

            expect(stub.someArray).toEqual([]);
        });

        it("all objects should return empty objects", function() {
            var stub = cactus.createStubBasedOn(SomeObject);

            expect(stub.someNumberLiteral).toBe(0);
        });

        it("all bools should return false", function() {
            var stub = cactus.createStubBasedOn(SomeObject);

            expect(stub.somebool).toBe(false);
        });
    });
});