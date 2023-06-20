import {StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IIconProps {
  name: string;
  style?: Object;
}

const Icon: React.FunctionComponent<IIconProps> = props => {
  return (
    <MaterialCommunityIcons
      name={props.name}
      style={props.style || styles.defaultStyle}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({
  defaultStyle: {
    color: '#c1c1c1',
  },
});
