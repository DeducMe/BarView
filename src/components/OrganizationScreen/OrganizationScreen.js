import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {
  STAR_FULL as starFull,
  STAR_EMPTY as starEmpty,
  OPEN_MENU_BTN as openMenuBtn,
  REVERSED_OPEN_MENU_BTN as reversedOpenMenuBtn,
} from '../../images/index';
import OrganizationFeatures from './OrganizationFeatures';
import MaskedView from '@react-native-masked-view/masked-view';

import globalStyles, {mainInfo as styles} from './styles';
const {width} = Dimensions.get('window');

export default function OrganizationScreen({navigation, route}) {
  const [favourite, setFavourite] = useState(false);
  const [hoursInfoOpen, setHoursInfoOpen] = useState(false);
  const photoList = useRef();
  const {
    name,
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

  const renderItem = ({item}) => {
    return (
      <Image style={{width: width, height: 220}} source={{uri: item}}></Image>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainHeaderContainer}>
        <Text style={styles.mainHeaderText}>{name}</Text>
        <TouchableOpacity onPress={() => setFavourite(!favourite)}>
          <Image source={favourite ? starFull : starEmpty}></Image>
        </TouchableOpacity>
      </View>
      <View style={{position: 'relative'}}>
        {!!logo && (
          <View style={styles.logo}>
            <Image style={styles.logoImage} source={{uri: logo}}></Image>
          </View>
        )}
        <FlatList
          ref={photoList}
          scrollEventThrottle={1}
          keyExtractor={(item, index) => index}
          horizontal
          data={organizationImages}
          pagingEnabled
          renderItem={renderItem}></FlatList>
      </View>
      <View style={styles.mainInfoBlockContainer}>
        <View style={styles.mainInfoBlockLeftContainer}>
          <Text style={styles.mainInfoBlockAddress}>{getAddress()}</Text>
          <TouchableOpacity
            style={styles.hoursInfo}
            onPress={() => setHoursInfoOpen(!hoursInfoOpen)}>
            <Text>{`Работает до ${Hours.Availabilities[0].Intervals[0].to.slice(
              0,
              -3,
            )}`}</Text>
            <Image
              style={styles.openMenuBtn}
              source={
                hoursInfoOpen ? reversedOpenMenuBtn : openMenuBtn
              }></Image>
          </TouchableOpacity>
          {hoursInfoOpen && (
            <View>
              {Hours.Availabilities[0].Everyday ? (
                <View
                  style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                  <Text>Ежедневно</Text>
                  <Text>{`${Hours.Availabilities[0].Intervals[0].from.slice(
                    0,
                    -3,
                  )} - ${Hours.Availabilities[0].Intervals[0].to.slice(
                    0,
                    -3,
                  )}`}</Text>
                </View>
              ) : (
                Hours.Availabilities.map(item => (
                  <View style={{width: '100%'}}>
                    {item.Monday && (
                      <View
                        style={[
                          globalStyles.flexRow,
                          globalStyles.justifyBetween,
                        ]}>
                        <Text>Понедельник</Text>
                        <Text>{`${item.Intervals[0].from.slice(
                          0,
                          -3,
                        )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                      </View>
                    )}
                    {item.Tuesday && (
                      <View
                        style={[
                          globalStyles.flexRow,
                          globalStyles.justifyBetween,
                        ]}>
                        <Text>Вторник</Text>
                        <Text>{`${item.Intervals[0].from.slice(
                          0,
                          -3,
                        )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                      </View>
                    )}
                    {item.Wednesday && (
                      <View
                        style={[
                          globalStyles.flexRow,
                          globalStyles.justifyBetween,
                        ]}>
                        <Text>Среда</Text>
                        <Text>{`${item.Intervals[0].from.slice(
                          0,
                          -3,
                        )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                      </View>
                    )}
                    {item.Thursday && (
                      <View
                        style={[
                          globalStyles.flexRow,
                          globalStyles.justifyBetween,
                        ]}>
                        <Text>Четверг</Text>
                        <Text>{`${item.Intervals[0].from.slice(
                          0,
                          -3,
                        )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                      </View>
                    )}
                    {item.Friday && (
                      <View
                        style={[
                          globalStyles.flexRow,
                          globalStyles.justifyBetween,
                        ]}>
                        <Text>Пятница</Text>
                        <Text>{`${item.Intervals[0].from.slice(
                          0,
                          -3,
                        )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                      </View>
                    )}
                    {item.Saturday && (
                      <View
                        style={[
                          globalStyles.flexRow,
                          globalStyles.justifyBetween,
                        ]}>
                        <Text>Суббота</Text>
                        <Text>{`${item.Intervals[0].from.slice(
                          0,
                          -3,
                        )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                      </View>
                    )}
                    {item.Sunday && (
                      <View
                        style={[
                          globalStyles.flexRow,
                          globalStyles.justifyBetween,
                        ]}>
                        <Text>Воскресенье</Text>
                        <Text>{`${item.Intervals[0].from.slice(
                          0,
                          -3,
                        )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                      </View>
                    )}
                  </View>
                ))
              )}
            </View>
          )}
        </View>
        <View style={styles.mainInfoBlockRightContainer}>
          {console.log(24 * parseFloat(rating.replace(',', '.')))}
          <View
            style={[
              globalStyles.flexRow,
              globalStyles.alignCenter,
              globalStyles.justifyBetween,
            ]}>
            <MaskedView
              maskElement={
                <View
                  style={{
                    width: 24 * parseFloat(rating.replace(',', '.')),
                    height: 24,
                    backgroundColor: '#fff',
                  }}></View>
              }>
              <View style={globalStyles.flexRow}>
                <Image style={styles.starIcon} source={starFull}></Image>
                <Image style={styles.starIcon} source={starFull}></Image>
                <Image style={styles.starIcon} source={starFull}></Image>
                <Image style={styles.starIcon} source={starFull}></Image>
                <Image style={styles.starIcon} source={starFull}></Image>
              </View>
            </MaskedView>
            <View style={[globalStyles.flexRow, {position: 'absolute'}]}>
              <Image style={styles.starIcon} source={starEmpty}></Image>
              <Image style={styles.starIcon} source={starEmpty}></Image>
              <Image style={styles.starIcon} source={starEmpty}></Image>
              <Image style={styles.starIcon} source={starEmpty}></Image>
              <Image style={styles.starIcon} source={starEmpty}></Image>
            </View>
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
      </View>
      {!!features && (
        <OrganizationFeatures features={features}></OrganizationFeatures>
      )}
    </View>
  );
}
