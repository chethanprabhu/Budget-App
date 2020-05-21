var Model = (function() {

    var Income = function(id, description, amount) {
        this.id = id;
        this.description = description;
        this.amount = amount;
    }

    var Expense = function(id, description, amount) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.percentage = -1;
    }

    var data = {
        item: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        finalBudget: 0
    }

    return {
        addItem: function(type, description, amount) {
            var newItem, id;

            if(data.item[type].length) {
                id = data.item[type][data.item[type].length-1].id + 1;
            } else {
                id = 0;
            }

            if(type === "inc") {
                newItem = new Income(id, description, amount);
            } else {
                newItem = new Expense(id, description, amount);
            }

            data.item[type].push(newItem);
        },

        test: function(){
            console.log(data);
        }
    }

})();

var View = (function() {

})();

var Controller = (function(model, view) {
    var type, description, amount;

    document.querySelector(".add__btn").addEventListener("click", function() {
        //Get the data from the input fields
        type = document.querySelector(".add__type").value;
        description = document.querySelector(".add__description").value;
        amount = document.querySelector(".add__value").value;

        //Add that particular data to the data-structure
        model.addItem(type, description, amount);
        //Update the UI with the added income/expense

        //update the budget on data structure and the UI
        updateBudget();
    })

    updateBudget = function() {
        //Update the total budget

        //Update the total budget on the UI

    }
    
    return {
        init: function(){
            console.log("application has started");
        }
    }

})(Model, View);

Controller.init();