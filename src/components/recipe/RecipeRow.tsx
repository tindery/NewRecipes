import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import { GRAY_COLOR } from '../../constrants/colors';

interface IRecipeRowProps {
  recipe: TRecipeWithID;
  isEven: boolean;
}

const RecipeRow: React.FunctionComponent<IRecipeRowProps> = props => {
  const {url, width, height} =
    props.recipe.images?.THUMBNAIL || props.recipe.images?.SMALL;

  return (
    <View style={[styles.row, !props.isEven && {backgroundColor: GRAY_COLOR}]}>
      <Image
        source={{uri: url}}
        style={{width: 120, height: 90 * (height / width)}}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {props.recipe.label}
        </Text>
        <Text>Cuisine: {props.recipe.cuisineType} </Text>
        <Text>Diet: {props.recipe.dietLabels}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', paddingVertical: 5},
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default RecipeRow;
