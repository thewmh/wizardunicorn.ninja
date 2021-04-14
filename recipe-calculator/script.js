;(function() {
    var ingredients = recipeData[0].ingredients;

    var config = {
        selectors: {
            recipe: 'recipe',
            inputs: 'input',
            editButton: 'editButton',
            resetButton: 'resetButton'
        }
    }

    var baseValues = {};
    var updatedValues = {};

    var init = function init() {
        createElements(ingredients);
        getElements();
        attachListeners();
        getBaseValues();
    }

    var createElements = function createElements(ingredients) {
        let recipeForm = document.getElementById('recipe');
        let content = '';
        for(let i = 0; i < ingredients.length; i++) {
            content += `<div class='fieldset'>
            <label for='${ingredients[i].id}'>${ingredients[i].name}</label>
            <input type='number' id='${ingredients[i].id}' placeholder='${ingredients[i].name}' value="${ingredients[i].amount}" disabled/>
          </div>`
        }
        recipeForm.innerHTML = content;
    }

    let toggled = false;

    function toggleRecipeEdit() {
        for(input of inputs) {
            input.disabled ? input.disabled = false : input.disabled = true;
        }
        toggled ? (editButton.innerText = 'Edit', toggled = false) : (editButton.innerText = 'Save', toggled = true);
    }

    function updateValues() {
        let key = this.id;
        let value = this.value;
        updatedValues[`${key}`] = value;

        updatedValues[`${key}`] == baseValues[`${key}`] ? resetValues() : updatedValues[`${key}`] > baseValues[`${key}`] ? doTheMaths(updatedValues[`${key}`], baseValues[`${key}`], key) : doTheMaths(baseValues[`${key}`], updatedValues[`${key}`], key);
    }

    function resetValues() {
        for(input of inputs) {
            input.value = baseValues[input.id]
        }
        updatedValues = {...baseValues};
    }

    function doTheMaths(val1, val2, key) {
        let enumerator = val1/val2;
        for(const value in updatedValues) {
            updatedValues[key] > baseValues[key] ?
            updatedValues[value] = Math.round(enumerator*baseValues[value]) :
            updatedValues[value] = Math.round(baseValues[value]/enumerator);
            document.getElementById(`${value}`).value = updatedValues[value];
        }
    }

    var getBaseValues = function getBaseValues() {
        for(input of inputs) {
            let key = input.id;
            let value = input.value;
            baseValues[`${key}`] = Number(value);
        }
        updatedValues = {...baseValues};
    }

    var getElements = function getElements() {
        recipe = document.getElementById(config.selectors.recipe);
        inputs = document.querySelectorAll(config.selectors.inputs, recipe);
        editButton = document.getElementById(config.selectors.editButton, recipe);
        resetButton = document.getElementById(config.selectors.resetButton, recipe);
    };

    var attachListeners = function attachListeners() {
        editButton.addEventListener('click', toggleRecipeEdit);
        resetButton.addEventListener('click', resetValues);
        for(input of inputs) {
            input.addEventListener('keyup', updateValues);
        }
    }

if (document.getElementById('recipe')) {
    init();
}

})(document, window);