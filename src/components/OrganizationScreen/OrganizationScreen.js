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
  FULLSCREEN_BTN as fullScreenBtnIcon,
} from '../../images/index';
import {getTodayHours} from '../../common/dateUtils';
import OrganizationFeatures from './OrganizationFeatures';
import MaskedView from '@react-native-masked-view/masked-view';

import globalStyles, {mainInfo as styles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
const {width} = Dimensions.get('window');

export default function OrganizationScreen({navigation, route}) {
  const [hoursInfoOpen, setHoursInfoOpen] = useState(false);
  const [imageFullOpened, setImageFullOpened] = useState(false);
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
      <Image
        style={{
          width: width,
          height: imageFullOpened ? 500 : 220,
          resizeMode: imageFullOpened ? 'contain' : 'cover',
          backgroundColor: '#000',
        }}
        source={{uri: item}}
      />
    );
  };

  const todayHours = getTodayHours(Hours);

  return (
    <ScrollView style={styles.mainContainer}>
      {organizationImages?.length > 0 && (
        <View style={{position: 'relative'}}>
          {!!logo && (
            <View style={[styles.logo, imageFullOpened && {top: 410}]}>
              <Image style={styles.logoImage} source={{uri: logo}} />
            </View>
          )}
          <TouchableOpacity
            onPress={() => setImageFullOpened(!imageFullOpened)}
            style={[styles.fullImageBtn, imageFullOpened && {top: 465}]}>
            <Image style={styles.fullImageBtnIcon} source={fullScreenBtnIcon} />
          </TouchableOpacity>
          <FlatList
            ref={photoList}
            scrollEventThrottle={1}
            keyExtractor={(item, index) => index}
            horizontal
            data={organizationImages}
            pagingEnabled
            renderItem={renderItem}
          />
        </View>
      )}
      <View style={styles.mainInfoBlockContainer}>
        <View style={styles.mainInfoBlockLeftContainer}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.mainInfoBlockAddress}>
            {getAddress()}
          </Text>
          {!!Hours && <WorkingHours></WorkingHours>}
        </View>

        <View>
          {rating && <StarBlock />}
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

  function StarBlock() {
    return (
      <View style={styles.mainInfoBlockRightContainer}>
        <View
          style={[
            globalStyles.flexRow,
            globalStyles.justifyBetween,
            globalStyles.alignCenter,
          ]}>
          <MaskedView
            maskElement={
              <View
                style={{
                  width: 19 * parseFloat(rating?.replace(',', '.')),
                  height: 19,
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
    );
  }

  function WorkingHours() {
    return (
      <View style={{marginBottom: 10}}>
        <TouchableOpacity
          style={styles.hoursInfo}
          disabled={todayHours === '24 hours'}
          onPress={() => setHoursInfoOpen(!hoursInfoOpen)}>
          {!!todayHours && todayHours !== '24 hours' && (
            <>
              <Text>{`Работает до ${todayHours}`}</Text>
              <Image
                style={styles.openMenuBtn}
                source={
                  hoursInfoOpen ? reversedOpenMenuBtn : openMenuBtn
                }></Image>
            </>
          )}
          {todayHours === '24 hours' && <Text>Работает 24 часа</Text>}
        </TouchableOpacity>
        {hoursInfoOpen && (
          <View style={{paddingVertical: 5}}>
            {Hours.Availabilities[0].Everyday ? (
              <View style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
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
              Hours.Availabilities.map((item, index) => (
                <View style={{width: '100%'}} key={index}>
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
    );
  }
}
