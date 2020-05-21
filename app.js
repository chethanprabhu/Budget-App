var Model = (function() {

})();

var View = (function() {

})();

var Controller = (function(model, view) {
    var type, description, amount;

    document.querySelector(".add__btn").addEventListener("click", function() {
        type = document.querySelector(".add__type").value;
        description = document.querySelector(".add__description").value;
        amount = document.querySelector(".add__value").value;
    })
    
    return {
        init: function(){
            console.log("application has started");
        }
    }

})(Model, View);

Controller.init();