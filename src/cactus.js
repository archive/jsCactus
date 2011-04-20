var Cactus = function() {
};

Cactus.prototype.createStubBasedOn = function(template, stubFunction) {
    stubFunction = stubFunction || function() {};
    var stub = {};

    var items = template;
    var checkHasOwnProperty = function(items, item) {
        return items.hasOwnProperty(item)
    }

    if (typeof(template) === "function") {
        items = template.prototype;
        checkHasOwnProperty = function(items, item) {
            return items.prototype.hasOwnProperty(item)
        }
    }

    for (item in items) {
        var typeOfItem = typeof items[item];
        if (checkHasOwnProperty(template, item) && item[0] !== "_") {
            if(typeOfItem  === "function"){
                stub[item] = stubFunction;
                continue;
            }
            if(typeOfItem  === "number"){
                stub[item] = 0;
                continue;
            }
            if(typeOfItem === "string"){
                stub[item] = "";
                continue;
            }
            if(typeOfItem === "boolean"){
                stub[item] = false;
                continue;
            }
            if(typeOfItem === "object" && items[item].length){
                stub[item] = [];
                continue;
            }
            if(typeOfItem === "object" && !items[item].length){
                stub[item] = {};
                continue;
            }
            throw "I don't know how to handle " + item + ".";
        }
    }

    return stub;
};


