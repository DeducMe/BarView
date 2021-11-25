import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  STAR_FULL as starFull,
  STAR_EMPTY as starEmpty,
} from '../../../images/index';
import MaskedView from '@react-native-masked-view/masked-view';
import globalStyles, {mainInfo as styles} from '../styles';
export default function StarBlock({rating, noNumber}) {
  return (
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
              width: 19 * rating,
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
      {!noNumber && <Text style={styles.ratingText}>{rating}</Text>}
    </View>
  );
}
