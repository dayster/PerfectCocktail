const ui = new UI(),
      cocktail = new CocktailAPI();
// Create Event Listener

function eventListeners(){
    const searchForm = document.querySelector('#search-form');
    if(searchForm){
        searchForm.addEventListener('submit', getCocktails);
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
                    ui.displayDrink(cocktails.cocktails.drinks);
                }
                
            }
        });
    }
}