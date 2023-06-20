import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import RecipeBadges from './RecipeBadges';
import RecipeInformation from './RecipeInformation';
import {WHITE_COLOR} from '../../constrants/colors';

interface IRecipeJumboProps {
  recipe: TRecipeWithID;
}

const RecipeJumbo: React.FunctionComponent<IRecipeJumboProps> = props => {
  const {url, width, height} =
    props.recipe.images?.LARGE || props.recipe.images?.REGULAR;
  const windowWidth = Dimensions.get('window').width;
  return (
    <View style={{flex: 1, backgroundColor: WHITE_COLOR}}>
      <Image
        source={{uri: url}}
        style={{width: windowWidth, height: (height * windowWidth) / width}}
        resizeMode="contain"
      />
      <View style={styles.infoWrapper} />
      <ScrollView>
        <View style={[styles.titleWrapper]}>
          <Text style={styles.titleText}>{props.recipe.label}</Text>
          <RecipeBadges recipe={props.recipe} />
        </View>
        <RecipeInformation recipe={props.recipe} />
      </ScrollView>
    </View>
  );
};

export default RecipeJumbo;

const styles = StyleSheet.create({
  infoWrapper: {
    margin: -30,
  },
  titleWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#00C53F',
    //overflow: 'hidden',
  },
  titleText: {
    fontSize: 24,
    color: WHITE_COLOR,
    fontWeight: 'bold',
  },
});
