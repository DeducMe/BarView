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
import MaskedView from '@react-native-masked-view/masked-view';
import {
  BIG_STAR_FULL as starFull,
  BIG_STAR_EMPTY as starEmpty,
  DISH as dishIcon,
} from '../../../images/index';
import globalStyles, {menuTabStyles as styles} from '../styles';

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
    const sectionData = data.map(item => {
      return {title: item.category, data: [item.dishes.split('=+=')]};
    });
    setMenuPositions(sectionData);
    setMenuLoaded(true);
  }

  useEffect(() => {
    getOrganizationMenu(id).then(data => {
      normalizeMenuPositions(data.rows);
    });
  }, []);

  function renderDish({item, index}) {
    const splitted = item.split('|');

    return (
      <View
        style={[styles.dishBlock, {marginLeft: index % 3 !== 0 ? '2%' : 0}]}>
        <Image
          style={styles.dishImage}
          source={{
            uri: splitted[1] === 'empty' ? dishIcon : splitted[1],
          }}
        />

        <Text style={styles.dishTitle}>{splitted[0]}</Text>
      </View>
    );
  }

  return (
    <View style={styles.menuContainer}>
      {menuPositions.length === 0 && !menuLoaded && (
        <View style={globalStyles.contentCenter}>
          <ActivityIndicator style={styles.loader}></ActivityIndicator>
        </View>
      )}
      {menuPositions && (
        <SectionList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[globalStyles.justifyBetween, {width: '100%'}]}
          keyExtractor={(item, index) => index}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.categoryHeader}>{title}</Text>
          )}
          sections={menuPositions}
          renderItem={props => {
            return (
              <FlatList
                numColumns={3}
                contentContainerStyle={[
                  globalStyles.justifyBetween,
                  {width: '100%'},
                ]}
                data={props.item}
                renderItem={renderDish}
                keyExtractor={(item, index) => index}
              />
            );
          }}
        />
      )}
    </View>
  );
}
