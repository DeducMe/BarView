import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Text>Cringe</Text>
      </TouchableOpacity>
    </View>
  );
}
