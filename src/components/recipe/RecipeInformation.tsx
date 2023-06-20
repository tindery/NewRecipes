import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {capitalizeFirstLetter} from '../../functions/helperFunctions';

interface IRecipeInformationProps {
  recipe: TRecipe;
}

const informationRows: Array<keyof TRecipe> = [
  'dishType',
  'calories',
  'yield',
  'ingredientLines',
];

const RecipeInformation: React.FunctionComponent<
  IRecipeInformationProps
> = props => {
  const transformRowName = (rowName: string): string => {
    switch (rowName) {
      case 'dishType':
        return 'Dish type';
      case 'ingredientLines':
        return 'Ingredients';
      default:
        return capitalizeFirstLetter(rowName);
    }
  };

  const transformRowValue = (rowValue: string | number | string[]): string => {
    switch (typeof rowValue) {
      case 'string':
        return rowValue;
      case 'number':
        return (Math.round(rowValue * 100) / 100).toString();
      default:
        return rowValue.join('\n');
    }
  };

  return (
    <View style={styles.informationWrapper}>
      {informationRows.map((rowName, key) => (
        <View key={key} style={styles.row}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{transformRowName(rowName)}</Text>
          <Text style={{maxWidth: '70%', textAlign: 'right', fontSize: 16}}>
            {transformRowValue(props.recipe[rowName])}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default RecipeInformation;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  informationWrapper: {
    margin: 10,
    flexDirection: 'column',
  },
});
