const ui = new UI(),
      cocktail = new CocktailAPI(),
      cocktailDB = new CocktailDB();
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
            case 'category':
                serverResponse = cocktail.getDrinksByCategory(searchTerm);
                break;
            case 'alcohol':
                serverResponse = cocktail.getDrinksByAlcohol(searchTerm);
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
    }

    // When btn click 
    if(e.target.classList.contains('favorite-btn')) {
        if(e.target.classList.contains('is-favorite') ) {
             // remove the class
             e.target.classList.remove('is-favorite');
             e.target.textContent = '+';

             // Remove from Storage
             cocktailDB.removeFromDB( e.target.dataset.id );
        } else {
             // Add the class
             e.target.classList.add('is-favorite');
             e.target.textContent = '-';

             // Get Info
             const cardBody = e.target.parentElement;

             const drinkInfo = {
                  id: e.target.dataset.id,
                  name: cardBody.querySelector('.card-title').textContent,
                  image: cardBody.querySelector('.card-img-top').src
             }

             // console.log(drinkInfo);
             // Add into the storage
             cocktailDB.saveIntoDB(drinkInfo);
        }
   }
}

// Document Ready

function documentReady(){
    ui.isFavorite();
    // Select the search category
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory){
        ui.printCategories()
    }

    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable){
        // Get favorites from storage and display
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks);

        // When view or delete click
        favoritesTable.addEventListener('click', e => {
            e.preventDefault();
            // Click View
            if(e.target.classList.contains('get-recipe')){
                cocktail.getSingleReceive(e.target.dataset.id)
                    .then(recipe => {
                        ui.displaySingleRecipe(recipe.recipe.drinks[0]);
                    });
            }

            // Click Remove
            if(e.target.classList.contains('remove-recipe')){
                //console.log(e.target.parentElement.parentElement);
                ui.removeFavorite(e.target.parentElement.parentElement);

                cocktailDB.removeFromDB(e.target.dataset.id);  
            }

        }); 
    }
}