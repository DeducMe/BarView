import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import StarBlock from './blocks/StarBlock';
import {getTodayHours} from '../../common/dateUtils';
import OrganizationFeatures from './blocks/OrganizationFeatures';
import WorkingHours from './blocks/WorkingHours';
import OrganizationPhotosCarousel from './blocks/OrganizationPhotosCarousel';

import globalStyles, {mainInfo as styles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';

export default function OrganizationScreen({navigation, route}) {
  const [fullAddressOpened, setFullAddressOpened] = useState(false);
  const {
    organizationImages,
    logo,
    address,
    Hours,
    rating,
    menuPositions,
    Categories,
    features,
  } = route.params.organization.info;

  const getAddress = () => {
    return address.replace('Россия,', '').replace('Москва,', '').trim();
  };

  const todayHours = getTodayHours(Hours);

  return (
    <ScrollView style={styles.mainContainer}>
      {organizationImages?.length > 0 && (
        <OrganizationPhotosCarousel
          organizationImages={organizationImages}
          logo={logo}
        />
      )}
      <View style={styles.mainInfoBlockContainer}>
        <View style={styles.mainInfoBlockLeftContainer}>
          <TouchableOpacity
            onPress={() => setFullAddressOpened(!fullAddressOpened)}>
            <Text
              numberOfLines={fullAddressOpened ? 3 : 1}
              ellipsizeMode="tail"
              style={styles.mainInfoBlockAddress}>
              {getAddress()}
            </Text>
          </TouchableOpacity>
          {!!Hours && (
            <WorkingHours todayHours={todayHours} Hours={Hours}></WorkingHours>
          )}
        </View>

        <View style={styles.mainInfoBlockRightContainer}>
          {rating && <StarBlock rating={rating} />}
          <TouchableOpacity style={globalStyles.flexRow}>
            <Text style={{color: '#0082E0', marginRight: 5}}>Отзывы</Text>
            <Text style={{color: '#0082E0', opacity: 0.6}}>0</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!!features && (
        <OrganizationFeatures features={features}></OrganizationFeatures>
      )}
    </ScrollView>
  );
}
