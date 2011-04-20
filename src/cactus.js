var Cactus = function() {
};

Cactus.prototype.createStubBasedOn = function(template, stubFunction) {
    //console.log(typeof template);
    //console.log(template instanceof Function);

    stubFunction = stubFunction || function() {};
    var stub = new Object();

    var items = template;
    var checkHasOwnProperty = function(items, item){items.hasOwnProperty(item)}
    if (template instanceof Function) {
        items = template.prototype;
        checkHasOwnProperty = function(items, item){items.prototype.hasOwnProperty(item)}
    }

        
        for (item in template.prototype) {
            if (template.prototype.hasOwnProperty(item) && item[0] !== "_") {
                stub[item] = stubFunction;
            }
        }
    } else {
        for (item in template) {
            if (template.hasOwnProperty(item) && item[0] !== "_") {
                stub[item] = stubFunction;
            }
        }
    }

    return stub;
};

