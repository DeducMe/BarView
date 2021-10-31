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
                    style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                    <Text>Понедельник</Text>
                    <Text>{`${item.Intervals[0].from.slice(
                      0,
                      -3,
                    )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                  </View>
                )}
                {item.Tuesday && (
                  <View
                    style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                    <Text>Вторник</Text>
                    <Text>{`${item.Intervals[0].from.slice(
                      0,
                      -3,
                    )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                  </View>
                )}
                {item.Wednesday && (
                  <View
                    style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                    <Text>Среда</Text>
                    <Text>{`${item.Intervals[0].from.slice(
                      0,
                      -3,
                    )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                  </View>
                )}
                {item.Thursday && (
                  <View
                    style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                    <Text>Четверг</Text>
                    <Text>{`${item.Intervals[0].from.slice(
                      0,
                      -3,
                    )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                  </View>
                )}
                {item.Friday && (
                  <View
                    style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                    <Text>Пятница</Text>
                    <Text>{`${item.Intervals[0].from.slice(
                      0,
                      -3,
                    )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                  </View>
                )}
                {item.Saturday && (
                  <View
                    style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
                    <Text>Суббота</Text>
                    <Text>{`${item.Intervals[0].from.slice(
                      0,
                      -3,
                    )} - ${item.Intervals[0].to.slice(0, -3)}`}</Text>
                  </View>
                )}
                {item.Sunday && (
                  <View
                    style={[globalStyles.flexRow, globalStyles.justifyBetween]}>
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
