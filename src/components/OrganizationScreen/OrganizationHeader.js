import React, {useState} from 'react';
import {SafeAreaView, Image, TouchableOpacity, View, Text} from 'react-native';
import {GO_BACK as goBackIcon} from '../../images/index';
import {mainInfo as styles} from './styles';
import {
  STAR_FULL as starFull,
  STAR_EMPTY as starEmpty,
} from '../../images/index';

export default function OrganizationHeader({navigation, name}) {
  const [favourite, setFavourite] = useState(false);

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View
        style={{
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{marginLeft: 15}}
          onPress={() => navigation.navigation.goBack()}>
          <Image style={{width: 20, height: 20}} source={goBackIcon}></Image>
        </TouchableOpacity>
        <Text style={styles.mainHeaderText}>{name}</Text>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => setFavourite(!favourite)}>
          <Image source={favourite ? starFull : starEmpty}></Image>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
