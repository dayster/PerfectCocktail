class CocktailAPI{
    async getDrinksByName(name){
        const apiResource = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
        const cocktails = await apiResource.json();
        return {
            
        }
    }
}