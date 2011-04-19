var Cactus = function() {
};

Cactus.prototype.createMockBasedOn = function(template) {
    var mock = new Object();
    for(item in template){
        if(template.hasOwnProperty(item)){
            mock[item] = function(){
                return;
            };
        }
    }
    return mock;
};

