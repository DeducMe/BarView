import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {GO_BACK as goBackIcon} from '../../images/index';

export default function OrganizationHeader({navigation}) {
  return (
    <SafeAreaView style={{padding: 10, backgroundColor: '#fff'}}>
      <TouchableOpacity
        style={{marginLeft: 15}}
        onPress={() => navigation.navigation.goBack()}>
        <Image style={{width: 20, height: 20}} source={goBackIcon}></Image>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
