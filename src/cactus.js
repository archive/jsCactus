var Cactus = function() {
};

Cactus.prototype.createStubBasedOn = function(template, stubFunction) {
    //console.log(typeof template);
    //console.log(template instanceof Function);

    stubFunction = stubFunction || function() {
    };
    var stub = new Object();

    var items = template;
    var checkHasOwnProperty = function(items, item) {
        return items.hasOwnProperty(item)
    }

    if (template instanceof Function) {
        items = template.prototype;
        checkHasOwnProperty = function(items, item) {
            return items.prototype.hasOwnProperty(item)
        }
    }

    for (item in items) {
        console.log(item);
        console.log(typeof items[item]);

        if (checkHasOwnProperty(template, item) && item[0] !== "_") {
            if(typeof items[item] === "function"){
                stub[item] = stubFunction;
                continue;
            }
            if(typeof items[item] === "number"){
                stub[item] = 0;
                continue;
            }
            if(typeof items[item] === "string"){
                stub[item] = "";
                continue;
            }
            if(typeof items[item] === "boolean"){
                stub[item] = false;
                continue;
            }
            if(typeof items[item] === "object" && items[item].length){
                stub[item] = [];
                continue;
            }
            if(typeof items[item] === "object" && !items[item].length){
                stub[item] = {};
                continue;
            }
            throw "I don't know how to handle " + item + ".";
        }
    }

    return stub;
};


