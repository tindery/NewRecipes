import {View, Text} from 'react-native';
import React, {useState} from 'react';
import SetupController from '../controllers/SetupController';
import DiscoverController from '../controllers/DiscoverController';

interface IDiscoverProps {}

const Discover: React.FunctionComponent<IDiscoverProps> = props => {
  const [isSettingUp, setIsSettingUp] = useState<boolean>(true);
  console.log('discover renders');
  return (
    <View style={{flex: 1}}>
      {isSettingUp ? (
        <SetupController confirm={() => setIsSettingUp(false)} />
      ) : (
        <DiscoverController />
      )}
    </View>
  );
};

export default Discover;
