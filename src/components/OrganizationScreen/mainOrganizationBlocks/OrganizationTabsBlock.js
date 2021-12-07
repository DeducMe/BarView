import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import globalStyles, {navigationTabs as styles} from '../../styles';

export default function OrganizationTabsBlock({navigateToTab}) {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.navigationTabBtn}
        onPress={() => navigateToTab(item.navigateTo)}>
        <Text style={styles.navigationTabText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      keyExtractor={(item, index) => index}
      contentContainerStyle={[
        globalStyles.justifyBetween,
        {width: '100%', paddingHorizontal: 10, marginTop: 10},
      ]}
      data={[
        {name: 'Обзор', navigateTo: 'Main'},
        {name: 'Меню', navigateTo: 'Menu'},
        {name: 'Отзывы', navigateTo: 'Reviews'},
      ]}
      horizontal
      renderItem={renderItem}></FlatList>
  );
}
