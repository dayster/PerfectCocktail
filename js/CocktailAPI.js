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

    async getSingleReceive(id){
        const apiResource = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recipe = await apiResource.json();
        return {
            recipe
        } 
    }

    // Retrives all the categories
    async getCategories(){
        const apiResource = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);

        const categories = await apiResource.json();

        return {
            categories
        }
    }

    // Get drinks by category
    async getDrinksByCategory(category){
        const apiResource = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        
        const cocktails = await apiResource.json();
        return {
            cocktails
        }
    }

    // Get drinks by Alcohol

    async getDrinksByAlcohol(term){
        const apiResource = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
        const cocktails = await apiResource.json();
        return {
            cocktails
        }
    }

}