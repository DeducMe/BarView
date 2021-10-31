import React from 'react';
import {View, Text, Image} from 'react-native';
import {WORK_IN_PROGRESS as workInProgress} from '../../../images/index';

export default function EmptyTab() {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', height: 400}}>
      <Image style={{width: 100, height: 100}} source={workInProgress}></Image>
      <Text style={{width: 250, fontSize: 16, textAlign: 'center'}}>
        Тут пока ничего нет, но совсем скоро точно точно будет...
      </Text>
    </View>
  );
}
