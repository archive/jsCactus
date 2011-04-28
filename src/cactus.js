var Cactus = function() {
};

Cactus.prototype.createStubBasedOn = function(template, stubFunction) {
    stubFunction = stubFunction || function() {};
    var stub = {};

    var members = template;
    var isNotFromInheritance = function(members, member) {
        return members.hasOwnProperty(member);
    };

    if (typeof(template) === "function") {
        members = template.prototype;
        isNotFromInheritance = function(members, member) {
            return members.prototype.hasOwnProperty(member);
        };
    }

    var isPublic = function(member){
        return member[0] !== "_";    
    };

    for (var member in members) {
        var typeOfmember = typeof members[member];
        if (isNotFromInheritance(template, member) && isPublic(member)) {
            if(typeOfmember  === "function"){
                stub[member] = stubFunction;
                continue;
            }
            if(typeOfmember  === "number"){
                stub[member] = 0;
                continue;
            }
            if(typeOfmember === "string"){
                stub[member] = "";
                continue;
            }
            if(typeOfmember === "boolean"){
                stub[member] = false;
                continue;
            }
            if(typeOfmember === "object" && members[member].length){ // array
                stub[member] = [];
                continue;
            }
            if(typeOfmember === "object" && !members[member].length){
                stub[member] = {};
                continue;
            }
            throw "I don't know how to handle " + member + ".";
        }
    }

    return stub;
};


