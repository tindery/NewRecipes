import {View, Text, StyleSheet, Pressable} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Icon from '../UIcomponents/Icon';
import {MAIN_COLOR, WHITE_COLOR} from '../../constrants/colors';

const TAB_BAR_ICONS = {
  Discover: 'compass',
  Saved: 'content-save',
  Settings: 'cog',
};

const TabBarComponent: React.FunctionComponent<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={[styles.tabBar, styles.shadow]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const {tabBarLabel = options.title || route.name} = options;
        const label = tabBarLabel;
        const isFocused = state.index === index;
        const color = isFocused ? WHITE_COLOR : '#666';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={'tabBarBtn' + route.key}
            onPress={onPress}
            style={[
              styles.tabBarItem,
              isFocused && {backgroundColor: MAIN_COLOR},
            ]}>
            <Icon
              style={{color, fontSize: isFocused ? 16 : 22}}
              name={TAB_BAR_ICONS[route.name]}
            />
            {isFocused ? (
              <Text style={{color, fontWeight: 'bold'}}>{label}</Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'relative',
    flexDirection: 'row',
    bottom: 15,
    marginHorizontal: 25,
    backgroundColor: '#dddddd',
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: '#666',
    borderWidth: 0.5,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    borderColor: '#666',
    borderWidth: 0.5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
});

export default TabBarComponent;
