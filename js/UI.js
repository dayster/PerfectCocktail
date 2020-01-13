class UI{
    // Display Drink Categories
    printCategories(){
        const categoryList = cocktail.getCategories()
            .then(categories => {
                //console.log(categories.categories.drinks);
                const catList = categories.categories.drinks;

                const firstOption = document.createElement('option');
                firstOption.textContent = '-Select-';
                firstOption.value = '';
                document.querySelector('#search').appendChild(firstOption);

                catList.forEach(category => {
                    const option = document.createElement('option');
                    option.textContent = category.strCategory;
                    option.value = category.strCategory.split(' ').join('-');
                    
                    document.querySelector('#search').appendChild(option);
                });
            })
    }
    

    displayDrinks(drinks){
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        const resultsDiv = document.querySelector('#results');

        //Loop through drinks
        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-4">
                    <div class="card my-3">
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                    </div>
                    <div class="card-body">
                        <h2 class="card-title text-center">${drink.strDrink}</h2>
                        <a data-target="#recipe" href="#" class="btn btn-success get-recipe" data-toggle="modal" data-id="${drink.idDrink}">Get Receive</a>
                    </div>
                </div>
            `;
        });

    }


    displayDrinksWithIngredients(drinks){
        // Show Results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // Insert results
        const resultsDiv = document.querySelector('#results');
        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                        <div class="card-body">
                            <h2 class="card-title text-center"></h2>
                            <p class="card-text font-weight-bold">Instructions</p>
                            <p class="card-text">
                                ${drink.strInstructions}
                            </p>
                            <p class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item alert alert-danger">
                                        Ingredients
                                    </li>
                                    ${this.displayIngredients(drink)}
                                </ul>
                            </p>
                            <p class="card-text font-weight font-weight-bold">Extra Information: </p>
                            <p class="card-text">
                                <span class="badge badge-pill badge-success">
                                    ${drink.strAlcoholic}
                                </span>
                                <span class="badge badge-pill badge-warning">
                                    Category: ${drink.strCategory}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `
        });
    }

    // Print Ingredients
    displayIngredients(drink){
        let ingredients = [];
        for(let i = 1; i < 16; i++){
            const ingredientMeasure = {};
            if(drink[`strIngredient${i}`] !== null){
                ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }
        }

        let ingredientsTemplate = '';
        ingredients.forEach(ingredient => {
            ingredientsTemplate += `
                <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
            `;  
        });
        return ingredientsTemplate;
    }

    displaySingleRecipe(recipe){
        const modalTitle = document.querySelector('.modal-title'),
              modalDescription = document.querySelector('.modal-body .description-text'),
              modalIngredients = document.querySelector('.modal-body .ingredient-list');

        console.log(recipe);
        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions;
        
        modalIngredients.innerHTML = this.displayIngredients(recipe);

    }

    printMessage(message, className){
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="alert alert-dismissible alert-${className}">
                <button type="button" class="close" data-dismiss="alert">x</button>
                ${message}
            </div>
        `;

        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearResults(){
        const resultsDiv = document.querySelector('#results');  
        resultsDiv.innerHTML = '';
    }
}