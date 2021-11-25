import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import globalStyles, {mainInfo as styles} from '../styles';
import {
  OPEN_MENU_BTN as openMenuBtn,
  REVERSED_OPEN_MENU_BTN as reversedOpenMenuBtn,
} from '../../../images/index';
export default function WorkingHours({todayHours, Hours}) {
  const [hoursInfoOpen, setHoursInfoOpen] = useState(false);
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
          {Hours.everyday ? (
            <View style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
              <Text>Ежедневно</Text>
              <Text>{Hours.everyday}</Text>
            </View>
          ) : (
            <View style={{width: '100%'}}>
              {Hours.monday && (
                <View
                  style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                  <Text>Понедельник</Text>
                  <Text>{Hours.monday}</Text>
                </View>
              )}
              {Hours.tuesday && (
                <View
                  style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                  <Text>Вторник</Text>
                  <Text>{Hours.tuesday}</Text>
                </View>
              )}
              {Hours.wednesday && (
                <View
                  style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                  <Text>Среда</Text>
                  <Text>{Hours.wednesday}</Text>
                </View>
              )}
              {Hours.thursday && (
                <View
                  style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                  <Text>Четверг</Text>
                  <Text>{Hours.thursday}</Text>
                </View>
              )}
              {Hours.friday && (
                <View
                  style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                  <Text>Пятница</Text>
                  <Text>{Hours.friday}</Text>
                </View>
              )}
              {Hours.saturday && (
                <View
                  style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                  <Text>Суббота</Text>
                  <Text>{Hours.saturday}</Text>
                </View>
              )}
              {Hours.sunday && (
                <View
                  style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                  <Text>Воскресенье</Text>
                  <Text>{Hours.sunday}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
}
