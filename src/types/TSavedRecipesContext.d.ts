type TSavedRecipesContext = {
  savedRecipes: TRecipeWithID[];
  saveRecipe: (recipe: TRecipeWithID) => void;
  removeRecipe: (id: string) => void;
};
