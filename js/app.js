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
        cocktail.getDrinksByName(searchTerm)
            .then(cocktails => {
                if(cocktails.cocktails.drinks === null){
                    ui.printMessage('There is no result', 'danger');
                }else{
                    ui.displayWithIngredient();
                }
            });
    }
}