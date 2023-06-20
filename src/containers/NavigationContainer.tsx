import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Discover from '../screens/Discover';
import Saved from '../screens/Saved';
import Settings from '../screens/Settings';
import TabBarComponent from '../components/tabBar/TabBarComponent';

const Tab = createBottomTabNavigator();

export type RootTabParamList = {
  Discover: {};
  Saved: {};
  Settings: {};
};

const NavigationContainerWrapper: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={TabBarComponent} screenOptions={{headerShown: false}}>
        <Tab.Screen name="Discover" component={Discover} />
        <Tab.Screen name="Saved" component={Saved} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationContainerWrapper;
