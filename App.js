import 'react-native-gesture-handler';
import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import ProfileScreen from './src/components/ProfileScreen';

import OrganizationScreen from './src/components/OrganizationScreen/OrganizationScreen';
import OrganizationHeader from './src/components/OrganizationScreen/OrganizationHeader';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="OrganizationScreen"
          component={OrganizationScreen}
          options={({route}) => ({
            header: navigation => (
              <OrganizationHeader
                name={route.params.organization.info.name}
                navigation={navigation}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
