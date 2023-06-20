import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {capitalizeFirstLetter} from '../../functions/helperFunctions';
import Icon from './Icon';
import {WHITE_COLOR} from '../../constrants/colors';

interface IBadgeProps {
  label: string | string[];
  type: 'cousine' | 'health' | 'diet';
}

const Badge: React.FunctionComponent<IBadgeProps> = props => {
  const label = useMemo(
    () =>
      typeof props.label === 'string'
        ? capitalizeFirstLetter(props.label)
        : props.label.map(item => capitalizeFirstLetter(item)).join(', '),
    [props.label],
  );

  const getIconName = (): string => {
    switch (props.type) {
      case 'cousine':
        return 'earth';
      case 'health':
        return 'heart-outline';
      case 'diet':
        return 'food-apple-outline';
      default:
        throw new Error('No icon found for type ' + props.type);
    }
  };

  return (
    <View style={styles.badge}>
      <Icon name={getIconName()} style={styles.icon} />
      <Text style={{color: 'white'}}>{label}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderColor: WHITE_COLOR,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: WHITE_COLOR,
    padding: 3,
    fontSize: 16,
  },
});
