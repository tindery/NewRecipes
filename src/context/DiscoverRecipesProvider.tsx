// context/todoContext.tsx
import React, {useContext, useEffect, useState} from 'react';
import {getRecipesFromApi} from '../functions/fetchRecipes';
import {DiscoverSettingsContext} from './DiscoverSettingsProvider';
import {generateRecipesWithIDsFromHits} from '../functions/discoverFunctions';

/**
 * DiscoverRecipesContext
 * Maintains queue for discovering recipes
 * shiftRecipe returns current recipe and removes it from queue
 * automatically loads new recipes when queue reaches 2 recipes
 */

export const DiscoverRecipesContext =
  React.createContext<TDiscoverRecipesContext | null>(null);

const DiscoverRecipesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [recipesQueue, setRecipesQueue] = useState<TRecipeWithID[]>([]);
  const [nextRecipesURL, setNextRecipesURL] = useState<string | undefined>(
    undefined,
  );
  const discoverSettingsContext = useContext(DiscoverSettingsContext);

  /**
   * Remove active recipe and return it
   */
  /*const shiftRecipe = (): TRecipeWithID => {
    const shiftedRecipe = recipesQueue.shift();
    if (!shiftedRecipe) {
      throw new Error(
        'DiscoverRecipesProvider: shiftRecipe error: recipesQueue is empty!',
      );
    }
    return shiftedRecipe;
  };*/

  /**
   * This one is important
   * It loads recipes from API based on set settings
   * It sets new queue and also "next" link, which is used to fetch more recepies of same settings
   */
  const loadRecipes = () => {
    console.log(
      '!!!!! LOADING RECIPES',
      discoverSettingsContext?.discoverSettings,
    );
    if (!discoverSettingsContext?.discoverSettings) {
      throw new Error(
        'DiscoverRecipesContext: loadRecipes error: discoverSettings are not set!' +
          ' Unable to load recipes.',
      );
    }
    // This is where the fun beggins
    getRecipesFromApi({
      settings: discoverSettingsContext.discoverSettings,
      urlOverride: nextRecipesURL, // API provides generated url for "next", meaning recipes wont repeat
    }).then(
      (
        result:
          | {hits: {recipe: TRecipe}[]; _links: {next: {href: string}}}
          | {status: string; message: string},
      ) => {
        try {
          if ('status' in result) {
            // TODO better error handling
            throw new Error(
              'DiscoverRecipesContext: loadRecipes: getRecipesFromApi error: ' +
                result.status +
                ': ' +
                result.message,
            );
          }
          setRecipesQueue([
            ...recipesQueue,
            ...generateRecipesWithIDsFromHits(result.hits),
          ]);
          setNextRecipesURL(result._links.next.href);
        } catch (error) {
          throw new Error(
            'DiscoverRecipesContext: loadRecipes: getRecipesFromApi.then: ' +
              error,
          );
        }
      },
    );
  };

  /**
   * This autoloads more recipes from API when recipesQueue reaches last 2 items
   */
  /*useEffect(() => {
    if (recipesQueue.length <= 2) {
      console.log("loading from stupid useEffect")
      loadRecipes();
    }
  }, recipesQueue);
  */

  return (
    <DiscoverRecipesContext.Provider value={{recipesQueue, loadRecipes}}>
      {children}
    </DiscoverRecipesContext.Provider>
  );
};

export default DiscoverRecipesProvider;
