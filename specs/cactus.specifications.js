describe("Cactus Specifications", function() {
    describe("when creating a mock from a object", function() {

        var cactus;
        var someObject;

        beforeEach(function() {
            cactus = new Cactus();

            someObject = {
                someMember : function() {
                }
            };
        });

        it("the object members should be included in the mock", function() {
            var mock = cactus.createMockBasedOn(someObject);

            expect(mock.someMember).toBeDefined();
        });

        it("the object members should be callable", function() {
            var mock = cactus.createMockBasedOn(someObject);

            mock.someMember();
            expect(true).toBeTruthy();
        });
    });

    describe("when creating a mock from a object which is in a inheritance", function() {

        var cactus;
        var SomeObject;

        beforeEach(function() {
            cactus = new Cactus();

            var SomeParentObject = function(){};
            SomeParentObject.prototype.someParentMember = function(){};

            SomeObject = function(){};
            SomeObject.prototype = new SomeParentObject();
            SomeObject.prototype.someMember = function(){};
        });

        it("the inherit members should not be included in the mock", function() {
            var someObject = new SomeObject();

            var mock = cactus.createMockBasedOn(someObject);

            expect(mock.someParentMember).toBeUndefined();
        });
    });
});