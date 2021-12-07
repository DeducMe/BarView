import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  SectionList,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {getOrganizationMenu} from '../../../api/apiQueries';
import StarBlock from '../mainTab/StarBlock';
import {
  BIG_STAR_FULL as starFull,
  BIG_STAR_EMPTY as starEmpty,
  DISH as dishIcon,
  SAD_FACE as sadFace,
} from '../../../images/index';
import globalStyles, {menuTabStyles as styles} from '../../styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

export default function MenuTab({id}) {
  const [menuPositions, setMenuPositions] = useState([]);
  const [menuLoaded, setMenuLoaded] = useState(false);

  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, []);
  };

  function normalizeMenuPositions(data) {
    const sectionData = data.reduce((accum, item) => {
      if (item.dishes?.length !== 0)
        accum.push({title: item.category, data: item.dishes.split('=+=')});
      return accum;
    }, []);
    console.log(sectionData);
    setMenuPositions(sectionData);
    setMenuLoaded(true);
  }

  useEffect(() => {
    getOrganizationMenu(id).then(data => {
      normalizeMenuPositions(data.rows);
    });
  }, []);

  function renderDish({item, index}) {
    if (item.length === 0) return null;
    const splitted = item.split('|');
    return (
      <View
        style={[styles.dishBlock, {marginLeft: index % 3 !== 0 ? '2%' : 0}]}>
        <TouchableOpacity>
          <View>
            {splitted[1] !== 'empty' ? (
              <Image
                style={styles.dishImage}
                source={{
                  uri: splitted[1],
                }}
              />
            ) : (
              <View
                style={[
                  styles.dishImage,
                  globalStyles.alignCenter,
                  globalStyles.justifyCenter,
                  {backgroundColor: '#F4F4F4'},
                ]}>
                <Image style={{height: 40, width: 40}} source={dishIcon} />
              </View>
            )}

            <View style={styles.menuPriceBlock}>
              <Text>{splitted[3]}</Text>
            </View>
          </View>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.dishTitle}>
            {splitted[0]}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.menuContainer}>
      {menuPositions.length === 0 && !menuLoaded && (
        <View style={globalStyles.contentCenter}>
          <ActivityIndicator style={styles.loader} size={'large'} />
        </View>
      )}

      <SectionList
        ListEmptyComponent={() =>
          menuLoaded ? (
            <View style={styles.bigInfoBlock}>
              <FastImage style={globalStyles.bigIcon} source={sadFace} />
              <Text style={styles.bigInfoBlockText}>
                Владелец пока не добавил меню...
              </Text>
            </View>
          ) : null
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          globalStyles.justifyBetween,
          {
            width: '100%',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          },
        ]}
        keyExtractor={(item, index) => index}
        renderSectionHeader={({section: {title, data}}) => {
          return data[0]?.length > 0 ? (
            <Text style={styles.categoryHeader}>{title}</Text>
          ) : null;
        }}
        sections={menuPositions}
        renderItem={renderDish}
      />

      {/* props => {
          return (
            <FlatList
              numColumns={3} // cамый легкий варианты использования numColumns, но совсем не самый производительный
              contentContainerStyle={[
                globalStyles.justifyBetween,
                {width: '100%', marginBottom: 10},
              ]}
              data={props.item}
              renderItem={renderDish}
              keyExtractor={(item, index) => index}
            />
          );
        } */}
    </View>
  );
}
