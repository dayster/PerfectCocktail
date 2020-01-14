class CocktailDB{

    // Save recipe into local storage

    saveIntoDB(drink){
        const drinks = this.getFromDB();

        drinks.push(drink);

        // Add array into local

        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    // Remove
    removeFromDB(id) {
        const drinks = this.getFromDB();

        // Loop
        drinks.forEach((drink, index) => {
             if(id === drink.id) {
                  drinks.splice(index, 1);
             }
        } );
        // Set the array into local storage
        localStorage.setItem('drinks', JSON.stringify(drinks) );
    }

    // Get
    getFromDB(){
        let drinks;
        if(localStorage.getItem('drinks') === null){
            drinks = [];
        }else{
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }
        return drinks;
    }
}