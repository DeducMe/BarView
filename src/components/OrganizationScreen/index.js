import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import StarBlock from './mainOrganizationBlocks/StarBlock';
import {getTodayHours} from '../../common/dateUtils';
import OrganizationFeatures from './mainOrganizationBlocks/OrganizationFeatures';
import WorkingHours from './mainOrganizationBlocks/WorkingHours';
import MenuPopularBlock from './mainOrganizationBlocks/MenuPopularBlock';
import OrganizationTabsBlock from './mainOrganizationBlocks/OrganizationTabsBlock';
import EmptyTab from './mainOrganizationBlocks/EmptyTab';

import OrganizationPhotosCarousel from './mainOrganizationBlocks/OrganizationPhotosCarousel';

import globalStyles, {mainInfo as styles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';

export default function OrganizationScreen({navigation, route}) {
  const [fullAddressOpened, setFullAddressOpened] = useState(false);
  const [openedTab, setOpenedTab] = useState('Main');
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

  const navigateToTab = tabName => {
    setOpenedTab(tabName);
  };

  const todayHours = getTodayHours(Hours);

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      {organizationImages?.length > 0 && (
        <OrganizationPhotosCarousel
          organizationImages={organizationImages}
          logo={logo}
        />
      )}
      <OrganizationTabsBlock navigateToTab={navigateToTab} />

      {openedTab === 'Main' && (
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
                <WorkingHours
                  todayHours={todayHours}
                  Hours={Hours}></WorkingHours>
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
          <View style={styles.blockSeparator} />
          <MenuPopularBlock menuPositions={menuPositions} />
        </>
      )}
      {openedTab === 'Reviews' && (
        <>
          <EmptyTab></EmptyTab>
        </>
      )}
      {openedTab === 'Menu' && (
        <>
          <EmptyTab></EmptyTab>
        </>
      )}
    </ScrollView>
  );
}
