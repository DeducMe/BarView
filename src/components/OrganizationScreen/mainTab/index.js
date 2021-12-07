import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import StarBlock from './StarBlock';
import {getTodayHours} from '../../../common/dateUtils';
import OrganizationFeatures from './OrganizationFeatures';
import WorkingHours from './WorkingHours';
import MenuPopularBlock from './MenuPopularBlock';
import globalStyles, {mainInfo as styles} from '../../styles';

export default function mainTab({organization}) {
  const [fullAddressOpened, setFullAddressOpened] = useState(false);
  const {
    address,
    rating,
    menupositions: menuPositions,
    menufeatures: menuFeatures,
    elsefeatures: elseFeatures,
  } = organization;

  const Hours = {
    everyday: organization.everyday,
    monday: organization.monday,
    tuesday: organization.tuesday,
    wednesday: organization.wednesday,
    thursday: organization.thursday,
    friday: organization.friday,
    saturday: organization.saturday,
    sunday: organization.sunday,
  };

  const getAddress = () => {
    return address.replace('Россия,', '').replace('Москва,', '').trim();
  };

  const todayHours = getTodayHours(Hours);
  const features = {
    menuFeatures: menuFeatures?.split('|'),
    elseFeatures: elseFeatures?.split('|'),
  };

  return (
    <>
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
      {!!features && <OrganizationFeatures features={features} />}
      <View style={styles.blockSeparator} />
      <MenuPopularBlock menuPositions={menuPositions} />
    </>
  );
}
