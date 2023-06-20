import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import Badge from '../UIcomponents/Badge';

interface IRecipeBadgesProps {
  recipe: TRecipe;
}

const RecipeBadges: React.FunctionComponent<IRecipeBadgesProps> = props => {
  return (
    <View style={styles.badgeWrapper}>
      <Badge type="cousine" label={props.recipe.cuisineType} />
      <Badge type="diet" label={props.recipe.dietLabels} />
    </View>
  );
};

export default RecipeBadges;

const styles = StyleSheet.create({
  badgeWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
});
