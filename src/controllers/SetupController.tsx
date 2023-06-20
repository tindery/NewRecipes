import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import SetupStep from '../components/setup/SetupStep';
import {MAIN_COLOR, WHITE_COLOR} from '../constrants/colors';
import {DiscoverSettingsContext} from '../context/DiscoverSettingsProvider';
import SetupHome from '../components/setup/SetupHome';

/**
 * This component is used to control the setup flow
 * It renders either SetupHome or SetupStep in order to allow user set search querry (discoverSettings)
 * It also sets up default discover settings to undefined, to appease TypeScript gods and allow default settings in future
 */

interface ISetupControllerProps {
  confirm: () => void;
}

export type TSetupSteps = keyof TDiscoverSettings | 'settings';

const DEFAULT_DISCOVER_SETTINGS: TDiscoverSettings = {
  dishType: undefined,
  mealType: undefined,
  cuisineType: undefined,
  diet: undefined,
  health: undefined,
};

const SetupController: React.FunctionComponent<
  ISetupControllerProps
> = props => {
  const [setupStep, setSetupStep] = useState<TSetupSteps>('settings');
  const discoverSettingsContext = useContext(DiscoverSettingsContext);

  // add default values to settings
  const discoverSettings = {
    ...DEFAULT_DISCOVER_SETTINGS,
    ...discoverSettingsContext?.discoverSettings,
  };

  // passed down to SetupStep to set specific discover setting
  const confirmSelectedItems = (
    key: keyof TDiscoverSettings,
    selectedItems?: string[] | undefined,
  ) => {
    if (!discoverSettingsContext?.setSettings) {
      // Check just in case
      throw new Error(
        'SetupController: confirmSelectedItems error: setSettings of discoverSettingsContext is not set.',
      );
    }
    if (selectedItems) {
      discoverSettingsContext.setSettings(key, selectedItems);
    } else {
      // This should not happen, but let's put warning here just in case
      console.warn(
        'SetupController: confirmSelectedItems warning: selectedItems is falsy. This should not happen. ' +
          selectedItems,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, color: WHITE_COLOR}}>Setup</Text>
      <View style={styles.stepsWrapper}>
        {setupStep === 'settings' ? (
          <SetupHome
            discoverSettings={discoverSettings}
            setSetupStep={setSetupStep}
            confirm={props.confirm}
          />
        ) : (
          <SetupStep
            defaultSelectedItems={discoverSettings[setupStep]}
            confirmSelectedItems={selectedItems =>
              confirmSelectedItems(setupStep, selectedItems)
            }
            setupStep={setupStep}
            goBack={() => setSetupStep('settings')}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', backgroundColor: MAIN_COLOR},
  stepsWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SetupController;
