import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/components/HomeScreen';
import ProfileScreen from './src/components/ProfileScreen';
import OrganizationScreen from './src/components/OrganizationScreen/OrganizationScreen';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{title: 'Welcome to prodile'}}
        />
        <Stack.Screen
          name="OrganizationScreen"
          component={OrganizationScreen}
          options={{title: 'Organization'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
