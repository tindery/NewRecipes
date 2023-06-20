import {View, StyleSheet} from 'react-native';
import React from 'react';
import Swiper from 'react-native-deck-swiper';
import RecipeJumbo from '../recipe/RecipeJumbo';
import {
  MAIN_COLOR,
  MAIN_COLOR_TRANSPARENT,
  RED_COLOR_TRANSPARENT,
} from '../../constrants/colors';
import Icon from '../UIcomponents/Icon';
import {WHITE_COLOR} from '../../constrants/colors';

interface ISwiperProps {
  recipeQueue: TRecipeWithID[];
  loadRecipes: () => void;
  saveRecipe: (recipe: TRecipeWithID) => void;
}

const SwiperComponent: React.FunctionComponent<ISwiperProps> = props => {
  // this function checks if we're running out of items in queue and loads more if so
  const onSwiped = (cardIndex: number) => {
    if (cardIndex >= props.recipeQueue.length - 2) {
      props.loadRecipes();
    }
  };

  const onSwipedRight = (cardIndex: number) => {
    props.saveRecipe(props.recipeQueue[cardIndex])
  };

  return (
    <View style={{flex: 1}}>
      <Swiper
        cards={props.recipeQueue}
        renderCard={(recipe: TRecipeWithID) => {
          return <RecipeJumbo recipe={recipe} />;
        }}
        cardIndex={0}
        backgroundColor={MAIN_COLOR}
        stackSize={2}
        verticalSwipe={false}
        cardVerticalMargin={0}
        cardHorizontalMargin={0}
        onSwipedRight={onSwipedRight}
        onSwiped={(cardIndex: number) => onSwiped(cardIndex)}
        animateOverlayLabelsOpacity={true}
        overlayOpacityHorizontalThreshold={10}
        overlayLabels={{
          right: {
            element: <Icon name="heart-outline" style={styles.overlayIcon} />,
            style: {
              wrapper: {
                alignItems: 'flex-start',
                backgroundColor: MAIN_COLOR_TRANSPARENT,
              },
            },
            title: 'YUM!',
          },
          left: {
            element: <Icon name="close" style={styles.overlayIcon} />,
            style: {
              wrapper: {
                alignItems: 'flex-end',
                backgroundColor: RED_COLOR_TRANSPARENT,
              },
            },
            title: 'EWW',
          },
        }}
        overlayLabelWrapperStyle={styles.overlayLabelWrapperStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayLabelWrapperStyle: {
    position: 'absolute',
    zIndex: 200,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  overlayIcon: {
    fontSize: 120,
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden',
    color: WHITE_COLOR,
  },
});

export default SwiperComponent;
