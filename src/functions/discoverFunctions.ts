const generateRecipeWithID = (recipe: TRecipe): TRecipeWithID => {
  const id = recipe.uri.split('#')[1] || recipe.uri;
  return {...recipe, id};
};

const addIDsToRecipeArray = (recipes: TRecipe[]): TRecipeWithID[] => {
  let newRecipesArray = [];
  for (let recipe of recipes) {
    newRecipesArray.push(generateRecipeWithID(recipe));
  }
  return newRecipesArray;
};

export const generateRecipesWithIDsFromHits = (
  hits: {recipe: TRecipe}[],
): TRecipeWithID[] => {
  let recipesArray = [];
  for (let hit of hits) {
    recipesArray.push(hit.recipe);
  }
  return addIDsToRecipeArray(recipesArray);
};
