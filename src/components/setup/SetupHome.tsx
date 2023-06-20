import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import { getSettingsLabel } from '../../functions/textTransformations';
import Icon from '../UIcomponents/Icon';
import ConfirmCancelBtns from '../UIcomponents/ConfirmCancelBtns';
import { WHITE_COLOR } from '../../constrants/colors';
import { TSetupSteps } from '../../controllers/SetupController';

interface ISetupHomeProps {
    discoverSettings: TDiscoverSettings
    setSetupStep: (newStep: TSetupSteps) => void
    confirm: () => void
}

const SetupHome: React.FunctionComponent<ISetupHomeProps> = props => {
 
    const getLabelText = (key: keyof TDiscoverSettings): string => {
        // get default label
        const label = getSettingsLabel(key);
        // get value
        const value = props.discoverSettings[key];
        if (value === undefined || !value.length) {
          // case 1: if there are no items selected, render prompt
          return 'Select ' + label.toLowerCase();
        }
        if (value.length === 1) {
          // case 2: if there is 1 item selected, render item name
          const settingLabel =
            typeof value[0] === 'string' ? value[0] : value[0].label;
          return label + ': ' + settingLabel;
        } else {
          // case 3: if there are more items selected, render number of items
          return label + ' (' + value.length + ')';
        }
      };

    const settingsKeys = Object.keys(props.discoverSettings) as Array<
    keyof TDiscoverSettings
  >;
  return (
    <View style={styles.stepsWrapper}>
      {settingsKeys.map(key => (
        <Pressable
          key={key}
          style={styles.step}
          onPress={() => props.setSetupStep(key)}>
          <Text style={{color: WHITE_COLOR}}>{getLabelText(key)}</Text>
          <Icon name="chevron-right" style={{color: 'white', fontSize: 16}} />
        </Pressable>
      ))}
      <ConfirmCancelBtns
        onConfirm={props.confirm}
        onCancel={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    stepsWrapper: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    step: {
      borderColor: WHITE_COLOR,
      borderWidth: 0.5,
      borderRadius: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
      margin: 15,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
  });

export default SetupHome;
