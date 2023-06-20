import {View, Text, FlatList} from 'react-native';
import React, {useContext} from 'react';
import {SavedRecipesContext} from '../context/SavedRecipesProvider';
import RecipeRow from '../components/recipe/RecipeRow';

interface ISavedProps {}

const Saved: React.FunctionComponent<ISavedProps> = props => {
  const savedRecipesContext = useContext(SavedRecipesContext);
  return (
    <View>
      <FlatList
        data={savedRecipesContext?.savedRecipes}
        renderItem={({item, index}) => (
          <RecipeRow recipe={item} isEven={!(index % 2)} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Saved;
