;(function() {
    var allRecipes = [];
    var recipeName,
    ingredients;
    
    var config = {
        selectors: {
            recipe: 'recipe',
            inputs: 'input',
            editButton: 'editButton',
            resetButton: 'resetButton',
            availableRecipes: 'available-recipe'
        }
    }

    var baseValues = {};
    var updatedValues = {};

    var init = function init() {
        getAvailableRecipes();
    }

    var createElements = function createElements(ingredients, allRecipes) {
        let recipeForm = document.getElementById('recipe');
        let content = '';
        content += `<h1>${recipeName}</h1>`;
        for(let i = 0; i < ingredients.length; i++) {
            content += `<div class='fieldset'>
            <label for='${ingredients[i].id}'>${ingredients[i].name}</label>
            <input type='number' id='${ingredients[i].id}' placeholder='${ingredients[i].name}' value="${ingredients[i].amount}" disabled/>
          </div>`
        }
        for(let i = 0; i < allRecipes.length; i++) {
            content += `<div class='all-recipes'>
            <a href="${allRecipes[i].src}" class="available-recipe">${allRecipes[i].title}</a>
          </div>`
        }
        recipeForm.innerHTML = content;
    }

    let toggled = false;

    function toggleRecipeEdit() {
      toggled ? (editButton.innerText = 'Edit', toggled = false, toggleInputs()) : (editButton.innerText = 'Save', toggled = true, toggleInputs());
      function toggleInputs() {
        for(input of inputs) {
            input.disabled && toggled == true ? input.disabled = false : input.disabled = true;
        }
      }
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
        updatedValues = baseValues;
    }

    function doTheMaths(val1, val2, key) {
        let enumerator = val1/val2;
        for(const value in updatedValues) {
            updatedValues[key] > baseValues[key] ?
            updatedValues[value] = (enumerator*baseValues[value]).toFixed(2) :
            updatedValues[value] = (baseValues[value]/enumerator).toFixed(2);
            document.getElementById(`${value}`).value = updatedValues[value];
        }
    }

    var getBaseValues = function getBaseValues() {
        for(input of inputs) {
            let key = input.id;
            let value = input.value;
            baseValues[`${key}`] = Number(value);
        }
        updatedValues = {};
        updatedValues = {...baseValues};
    }

    var getElements = function getElements() {
        recipe = document.getElementById(config.selectors.recipe);
        inputs = document.querySelectorAll(config.selectors.inputs, recipe);
        editButton = document.getElementById(config.selectors.editButton, recipe);
        resetButton = document.getElementById(config.selectors.resetButton, recipe);
        availableRecipes = document.getElementsByClassName(config.selectors.availableRecipes, recipe);
    };

    var attachListeners = function attachListeners() {
        editButton.addEventListener('click', toggleRecipeEdit);
        resetButton.addEventListener('click', resetValues);
        for(input of inputs) {
            input.removeEventListener('blur', updateValues);
            input.addEventListener('blur', updateValues);
        }
        for(let i = 0; i < availableRecipes.length; i++) {
          availableRecipes[i].addEventListener('click', function(e){e.preventDefault(); loadThisRecipe(this);})
        }
    }

    var loadThisRecipe = async function loadThisRecipe(el) {
      let response;
      const url = el.href ? el.href : el.src;
      response = await fetch(url)
      .then(res => res.json())
      .then(data => {return data})
      
      ingredients = response.recipeData[0].ingredients;
      recipeName = response.recipeData[0].name;
      
      createElements(ingredients, allRecipes)
      getElements();
      resetObjects();
      getBaseValues();
      attachListeners();
      resetToggleState();
    }

    var resetObjects = function resetObjects() {
      baseValues = {};
      updatedValues = {};
    }

    var resetToggleState = function resetToggleState() {
      toggled = true;
      toggleRecipeEdit();
    }

    var getAvailableRecipes = function getAvailableRecipes() {
      let recipes = document.getElementsByClassName('original-recipe')
      for(let i = 0; i < recipes.length; i++) {
        allRecipes.push(recipes[i])
      }
      loadThisRecipe(allRecipes[0])
    }

if (document.getElementById('recipe')) {
    init();
}

})(document, window);