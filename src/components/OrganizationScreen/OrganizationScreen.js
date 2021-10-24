import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function OrganizationScreen({navigation, route}) {
  useEffect(() => {});
  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text>goBack</Text>
      </TouchableOpacity>
      <Text>{route.params.organization.id}</Text>
    </View>
  );
}
