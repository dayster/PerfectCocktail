class CocktailAPI{
    async getDrinksByName(name){
        const apiResource = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const cocktails = await apiResource.json();
        return {
            cocktails
        }
    }

    // Get receipes by ingredient

    async getDrinksByIngredient(ingredient){
        // Search Ingredient
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const cocktails = await apiResponse.json();
        return {
            cocktails
        }
    }
}