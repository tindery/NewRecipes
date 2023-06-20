import {Text, Pressable} from 'react-native';
import React from 'react';
import Icon from '../UIcomponents/Icon';
import { WHITE_COLOR } from '../../constrants/colors';

// TODO add descriptions to labels from data folder
// that is the only reason this is a separated file

interface ISetupStepRowProps {
  label: string;
  selected: boolean;
  toggleItem: () => void;
}

const SetupStepRow: React.FunctionComponent<ISetupStepRowProps> = props => {
  //console.log("render setup row", props)
  return (
    <Pressable
      onPress={props.toggleItem}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{ color: WHITE_COLOR }}>
        {props.selected ? <Icon name="check" style={{margin: 4, fontSize: 16}} /> : null}
        <Text>{props.label}</Text>
      </Text>
    </Pressable>
  );
};

export default SetupStepRow;
