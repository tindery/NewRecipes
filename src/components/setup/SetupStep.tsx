import {View, Text} from 'react-native';
import React, {useMemo, useState} from 'react';
import ConfirmCancelBtns from '../UIcomponents/ConfirmCancelBtns';
import {getAllItemsForSetupStep} from '../../functions/setupFunctions';
import SetupStepRow from './SetupStepRow';
import {removeItemFromArray} from '../../functions/helperFunctions';

interface ISetupStepProps {
  defaultSelectedItems: string[] | undefined;
  confirmSelectedItems: (selectedItems?: string[]) => void;
  setupStep: keyof TDiscoverSettings;
  goBack: () => void;
}

const SetupStep: React.FunctionComponent<ISetupStepProps> = props => {
  const allItems = useMemo(
    () => getAllItemsForSetupStep(props.setupStep),
    [props.setupStep],
  );
  const [selectedItems, setSelectedItems] = useState(
    props.defaultSelectedItems,
  );

  //console.log("render setup step", props)
  const isItemSelected = (item: string): boolean => {
    return !!selectedItems?.includes(item);
  };
  const toggleItem = (item: string) => {
    console.log('toggle called');
    if (isItemSelected(item)) {
      if (!selectedItems) {
        throw new Error(
          'SetupStep: onItemPress error: attempting to remove item from empty array!' +
            selectedItems,
        );
      }
      setSelectedItems(removeItemFromArray(selectedItems, item));
    } else {
      setSelectedItems(selectedItems ? [...selectedItems, item] : [item]);
    }
  };

  return (
    <View>
      {allItems.map((item, key) => {
        return (
          <SetupStepRow
            key={key}
            label={item}
            selected={isItemSelected(item)}
            toggleItem={() => toggleItem(item)}
          />
        );
      })}
      <ConfirmCancelBtns
        onConfirm={() => {
          console.log('wtf', selectedItems);
          props.confirmSelectedItems(selectedItems);
          props.goBack();
        }}
        onCancel={props.goBack}
      />
    </View>
  );
};

export default SetupStep;
