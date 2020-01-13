const ui = new UI(),
      cocktail = new CocktailAPI();
// Create Event Listener

function eventListeners(){
    // Document Ready
    document.addEventListener('DOMContentLoaded', documentReady);

    const searchForm = document.querySelector('#search-form');
    if(searchForm){
        searchForm.addEventListener('submit', getCocktails);
    }

    // The results div listeners
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv){
        resultsDiv.addEventListener('click', resultsDelegation);
    }

    
}

eventListeners();

function getCocktails(e){
    e.preventDefault();
    const searchTerm = document.querySelector('#search').value;
    if(searchTerm === ''){
        ui.printMessage('Print Add Something', 'danger');
    }else{
        // Server Response
        let serverResponse;

        // Type of search

        const type = document.querySelector('#type').value;

        // Evaluate 

        switch (type) {
            case 'name':
                serverResponse = cocktail.getDrinksByName(searchTerm);
                break;
            case 'ingredient':
                serverResponse = cocktail.getDrinksByIngredient(searchTerm);
                break;
        }         
        
        ui.clearResults();

        serverResponse.then(cocktails => {
            if(cocktails.cocktails.drinks === null){
                ui.printMessage('There is no result', 'danger');
            }else{
                //console.log(cocktails.cocktails.drinks);
                if(type === 'name'){
                    // Display Ingredient
                    ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
                }else{
                    // Diplay without Ingredient
                    ui.displayDrinks(cocktails.cocktails.drinks);
                }
                
            }
        });
    }
}

function resultsDelegation(e){
    e.preventDefault(); 
    if(e.target.classList.contains('get-recipe')){
        console.log(e.target.dataset.id);
        cocktail.getSingleReceive(e.target.dataset.id)
            .then(recipe => {
                ui.displaySingleRecipe(recipe.recipe.drinks[0]);
            })
    }else{
        console.log('Nope');
    }
}

// Document Ready

function documentReady(){
    // Select the search category
    console.log('Hello From Ready');
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory){
        ui.printCategories()
    }
}