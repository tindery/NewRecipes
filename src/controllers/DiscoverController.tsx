import {ActivityIndicator} from 'react-native';
import React, {Suspense, useContext, useMemo} from 'react';
import {DiscoverRecipesContext} from '../context/DiscoverRecipesProvider';
import SwiperComponent from '../components/discover/Swiper';
import {SavedRecipesContext} from '../context/SavedRecipesProvider';

interface IDiscoverControllerProps {}

const fallbackComponent = <ActivityIndicator />;

const DiscoverController: React.FunctionComponent<
  IDiscoverControllerProps
> = props => {
  const discoverRecipesContext = useContext(DiscoverRecipesContext);
  const savedRecipesContext = useContext(SavedRecipesContext);
  const data = useMemo(() => discoverRecipesContext?.loadRecipes(), []);

  if (!discoverRecipesContext) return fallbackComponent;
  console.log('DiscoverControllerrr', data);

  const saveRecipe = (recipe: TRecipeWithID) => {
    savedRecipesContext?.saveRecipe(recipe);
  };

  return (
    <Suspense fallback={fallbackComponent}>
      {discoverRecipesContext?.recipesQueue.length ? (
        <SwiperComponent
          saveRecipe={saveRecipe}
          recipeQueue={discoverRecipesContext?.recipesQueue}
          loadRecipes={discoverRecipesContext.loadRecipes}
        />
      ) : (
        fallbackComponent
      )}
    </Suspense>
  );
};

export default DiscoverController;
