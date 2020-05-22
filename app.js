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
        finalBudget: 0,
        finalPercentage: 0
    }

    return {
        addItem: function(type, description, amount) {
            var newItem, id;

            if(data.item[type].length) {
                id = data.item[type][data.item[type].length-1].id + 1;
            } else {
                id = 0;
            }
            if(description !== "" || amount !== "") {
                if(type === "inc") {
                    newItem = new Income(id, description, amount);
                } else {
                    newItem = new Expense(id, description, amount);
                }
    
                data.item[type].push(newItem);
    
                return newItem;
            }   
        },
        updateBudget: function(item, type) {
            data.totals[type] = parseFloat(data.totals[type]) + parseFloat(item.amount);
            data.finalBudget = parseFloat(data.totals.inc) - parseFloat(data.totals.exp);
            data.finalPercentage = ((parseFloat(data.totals.exp) / parseFloat(data.totals.inc)) * 100).toFixed(0);

            return {
                updatedIncome: data.totals.inc,
                updatedExpense: data.totals.exp,
                updatedBudget: data.finalBudget,
                updatedPercentage: data.finalPercentage
            }
        },

        test: function(){
            console.log(data);
        }
    }

})();

var View = (function() {

    return {
        addItemToUI: function(newItem, type){
            var updatedItemTemplate, className, itemTemplate;

            if(type === "inc") {
                className = ".income__list"

                itemTemplate = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix">'+
                '<div class="item__value">%amount%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                '</div></div></div>';
            } else {
                className = ".expenses__list"

                itemTemplate = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%amount%</div>'+
                '<div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>'+
                '</div></div></div>';
            }
            updatedItemTemplate = itemTemplate.replace("%id%", newItem.id);
            updatedItemTemplate = updatedItemTemplate.replace("%description%", newItem.description);
            updatedItemTemplate = updatedItemTemplate.replace("%amount%", "₹ "+newItem.amount);

            document.querySelector(className).insertAdjacentHTML("beforeend", updatedItemTemplate);
        },
        updateBudgetUI: function(updatedValues) {
            document.querySelector(".budget__value").textContent = "₹ "+updatedValues.updatedBudget;
            document.querySelector(".budget__income--value").textContent = "₹ "+updatedValues.updatedIncome;
            document.querySelector(".budget__expenses--value").textContent = "₹ "+updatedValues.updatedExpense;
            if(updatedValues.updatedIncome <= 0) {
                document.querySelector(".budget__expenses--percentage").textContent = "---";
            } else {
                document.querySelector(".budget__expenses--percentage").textContent = updatedValues.updatedPercentage + "%";
            }
        }
    }
})();

var Controller = (function(model, view) {

    document.querySelector(".add__btn").addEventListener("click", function() {
        var newItem, type , description, amount;
        //Get the data from the input fields
        type = document.querySelector(".add__type").value;
        description = document.querySelector(".add__description").value;
        amount = document.querySelector(".add__value").value;

        //Add that particular data to the data-structure
        newItem = model.addItem(type, description, amount);

        //reset the input fields
        document.querySelector(".add__description").value = "";
        document.querySelector(".add__value").value = "";

        //Update the UI with the added income/expense
        view.addItemToUI(newItem, type);

        //update the budget on data structure and the UI
        updateBudget(newItem, type);
    })

    document.querySelector(".add__type").addEventListener("change", function() {
        console.log("hello");
        document.querySelector(".add__type").classList.toggle('red-focus');
        document.querySelector(".add__description").classList.toggle('red-focus');
        document.querySelector(".add__value").classList.toggle('red-focus');
        document.querySelector(".add__btn").classList.toggle('red');
    })

    updateBudget = function(item, type) {
        //Update the total budget
        var updatedValues = model.updateBudget(item, type);
        //Update the total budget on the UI
        view.updateBudgetUI(updatedValues);
    }
    
    return {
        init: function(){
            console.log("application has started");
            document.querySelector(".budget__value").textContent = "₹ 0";
            document.querySelector(".budget__income--value").textContent = "₹ 0";
            document.querySelector(".budget__expenses--value").textContent = "₹ 0";
            document.querySelector(".budget__expenses--percentage").textContent = "---";
            document.querySelector(".budget__title--month").textContent = ['January','February','March','April','May','June','July','August','September','October','November','December'][new Date().getMonth()] + " " +
                new Date().getFullYear();
        }
    }

})(Model, View);

Controller.init();