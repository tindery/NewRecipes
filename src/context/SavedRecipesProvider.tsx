// context/todoContext.tsx
import React from 'react';
import {useAsyncStorage} from '../hooks/useAsyncStorage';

/**
 * SavedRecipesContext
 * Handles saved recipes (duh)
 * Saved recipes are saved in phone for later uses using AsS (haha) hook
 */

export const SavedRecipesContext =
  React.createContext<TSavedRecipesContext | null>(null);

const SavedRecipesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [savedRecipes, setSavedRecipes] = useAsyncStorage<TRecipeWithID[]>(
    'savedRecipes',
    [],
  );

  const saveRecipe = (newRecipe: TRecipeWithID) => {
    console.log('new saved recipe', newRecipe, savedRecipes);
    setSavedRecipes([...savedRecipes, newRecipe]);
  };

  const removeRecipe = (id: string) => {
    const newSavedRecipes = savedRecipes.filter(
      (recipe: TRecipeWithID) => recipe.id !== id,
    );
    setSavedRecipes(newSavedRecipes);
  };

  return (
    <SavedRecipesContext.Provider value={{savedRecipes, saveRecipe, removeRecipe}}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

export default SavedRecipesProvider;
