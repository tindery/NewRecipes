import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from './Icon';
import {MAIN_COLOR, RED_COLOR} from '../../constrants/colors';
import {SHADOW_STYLE} from '../../styles/shadow';

interface IConfirmCancelBtnsProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmCancelBtns: React.FunctionComponent<
  IConfirmCancelBtnsProps
> = props => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.roundBtn} onPress={props.onConfirm}>
        <Icon name="check-bold" style={[styles.icon, {color: MAIN_COLOR}]} />
      </Pressable>
      <Pressable style={styles.roundBtn} onPress={props.onCancel}>
        <Icon name="close-thick" style={[styles.icon, {color: RED_COLOR}]} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  roundBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#888',
    ...SHADOW_STYLE,
  },
  icon: {fontSize: 24},
});

export default ConfirmCancelBtns;
