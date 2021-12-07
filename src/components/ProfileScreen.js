import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TextInput,
  TouchableHighlight,
  FlatList,
  Image,
} from 'react-native';
const {width} = Dimensions.get('window');
import MaskedView from '@react-native-masked-view/masked-view';
import FastImage from 'react-native-fast-image';
import {STAR_FULL as starFull, STAR_EMPTY as starEmpty} from '../images/index';
import {Geocoder} from 'react-native-yamap';
import {PLUS, MINUS, MARKER, SEARCH, CLOSE} from '../images';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps-super-cluster';
import {getOrganizationCoords} from '../api/apiQueries';
import globalStyles from './styles';
// Geocoder.geoToAddress({ lat: 37.597576, lon: 55.771899 })
//   .then(data => console.log(data))
const path = '/Users/alexanderzakalsky/projects/Bar/front';

const route = {
  start: {lat: 0, lon: 0},
  end: {lat: 10, lon: 10},
};

export default function ProfileScreen({navigation}) {
  const [markers, setMarkers] = useState([]);
  const [searchQueryText, setSearchQueryText] = useState('');
  const [searchQueryResult, setSearchQueryResult] = useState([]);
  const [chosenId, setChosenId] = useState(121926463456);
  const [searchOpened, setSearchOpened] = useState(false);
  const [markersLoading, setMarkersLoading] = useState(false);

  Geocoder.init('8f3ed51c-817e-4946-ac9f-ed375107d4f3');
  const map = useRef(null);
  useEffect(async () => {
    if (map.current.setCenter)
      map.current.setCenter(
        {lat: 55.7221513871823, lon: 37.63555933517637},
        10,
        0,
        0,
        0,
      );
    readOrganizationsJSON();
  }, []);

  useEffect(() => {}, [searchQueryResult]);

  useEffect(() => {
    setMarkersLoading(false);
  }, [markers]);

  function addNewOrganizationMarker(organization) {
    setMarkers(markers.concat(organization));
  }

  function getCurrentPosition() {
    return new Promise(resolve => {
      if (map.current) {
        map.current.getCameraPosition(position => {
          resolve(position);
        });
      }
    });
  }

  function readOrganizationsJSON() {
    getOrganizationCoords().then(data => getOrganizations(data.rows));
  }

  function getOrganizations(data) {
    setMarkersLoading(true);

    const result = data.map(item => {
      return {
        id: item.id,
        name: item.name,
        rating: item.rating,
        coordinates: {
          longitude: item.coordinatesx,
          latitude: item.coordinatesy,
        },
      };
    });

    setMarkers(markers.concat(result));
  }

  function openMarkerInfo(marker) {
    navigation.navigate('OrganizationScreen', {
      organizationId: marker.id,
      name: marker.name,
    });
  }

  function searchForQuery() {
    if (searchQueryText === '') return setSearchQueryResult(markers);

    const filteredMarkers = markers.filter(marker =>
      marker.name.includes(searchQueryText),
    );
    setSearchQueryResult(filteredMarkers);
  }

  async function onZoomPress(where, coordinates) {
    if (!map && !map.current) {
      return;
    }

    if (coordinates) {
      const moveCamera = await map.current.mapview.getCamera();
      moveCamera.center = coordinates;

      await map.current.mapview.animateToRegion(
        {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
        200,
      );
    }
    setTimeout(async () => {
      const camera = await map.current.mapview.getCamera();
      if (where === 'in') {
        if (Platform.OS === 'ios') {
          camera.altitude /= 2;
        } else {
          camera.zoom = camera.zoom + 1;
        }
      } else {
        if (Platform.OS === 'ios') {
          camera.altitude *= 2;
        } else {
          camera.zoom = camera.zoom - 1;
        }
      }

      await map.current.mapview.animateCamera(camera, {duration: 200});
    }, 300);
  }

  function renderResultQueryItem({item, index}) {
    let indexStyles = false;
    if (
      searchQueryResult.length % 4 !== 0 &&
      index === searchQueryResult.length - 1
    ) {
      indexStyles = {marginBottom: 56};
    }

    return (
      <View
        key={index}
        style={[
          styles.searchQueryResultItem,
          index % 2 !== 0 && {marginLeft: '4%'},
          indexStyles && indexStyles,
        ]}>
        <Text style={styles.searchQueryResultItemText}>{item.name}</Text>
        {item.rating && (
          <View style={styles.searchQueryResultItemRating}>
            <MaskedView
              maskElement={
                <View
                  style={{
                    width: 19 * (item.rating / 5),
                    height: 19,
                    backgroundColor: '#fff',
                  }}
                />
              }>
              <Image style={{width: 19, height: 19}} source={starFull} />
            </MaskedView>
            <View style={{position: 'absolute'}}>
              <Image style={{width: 19, height: 19}} source={starEmpty}></Image>
            </View>
            <Text>{item.rating}</Text>
          </View>
        )}
      </View>
    );
  }

  useEffect(() => {
    if (searchOpened === true) searchForQuery();
  }, [searchQueryText, searchOpened]);

  return (
    <View style={{flex: 1, width: '100%', height: '100%'}}>
      <MapView
        ref={map}
        fitAllMarkers
        showsUserLocation={true}
        zoomEnabled={true}
        data={markers}
        accessor={'coordinates'}
        radius={width * 0.08}
        renderMarker={(item, index) => (
          <Marker
            key={index}
            onPress={openMarkerInfo.bind(this, item)}
            image={MARKER}
            coordinate={item.coordinates}
            style={{width: 26, height: 28}}
          />
        )}
        renderCluster={(item, index) => (
          <Marker
            key={index}
            coordinate={item.coordinate}
            onPress={() => onZoomPress('in', item.coordinate)}>
            <View
              style={{
                borderRadius: 25,
                width: item.pointCount > 20 ? 42 : 28,
                height: item.pointCount > 20 ? 42 : 28,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}>
              <Text>{item.pointCount}</Text>
            </View>
          </Marker>
        )}
        initialRegion={{
          latitude: 55.746953111304435,
          longitude: 37.615575661165195,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        style={{flex: 1, width: '100%', height: '100%'}}
      />
      {markersLoading && (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      )}
      <View style={styles.buttonsBlock}>
        <View style={[globalStyles.flexRow, styles.shadow]}>
          {searchOpened && (
            <>
              <View style={styles.searchQueryInputContainer}>
                <TextInput
                  style={styles.searchQueryInput}
                  onChangeText={value => {
                    setSearchQueryText(value);
                  }}
                  value={searchQueryText}
                />
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                pagingEnabled
                style={styles.searchQueryResult}
                numColumns={2}
                data={searchQueryResult}
                renderItem={renderResultQueryItem}
              />
            </>
          )}

          <TouchableHighlight
            underlayColor={'#e5e5e5'}
            onPress={() => setSearchOpened(!searchOpened)}
            style={[styles.shadow, styles.button]}>
            <FastImage
              source={searchOpened ? CLOSE : SEARCH}
              style={styles.icon}
            />
          </TouchableHighlight>
        </View>
        <TouchableOpacity
          onPress={() => onZoomPress('in')}
          style={[styles.shadow, styles.button]}>
          <FastImage source={PLUS} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onZoomPress('out')}
          style={[styles.shadow, styles.button]}>
          <View>
            <FastImage source={MINUS} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonsBlock: {
    position: 'absolute',
    right: 20,
    bottom: 40,
  },
  icon: {
    width: 24,
    height: 24,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 2,
  },
  searchQueryInput: {
    height: 48,
    paddingHorizontal: 12,
  },
  searchQueryInputContainer: {
    width: width - 48 - 8 - 8 - 40,
    marginRight: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    height: 48,
    alignSelf: 'flex-end',
  },
  searchQueryResult: {
    position: 'absolute',
    left: 0,
    bottom: -120,

    height: 112,
    width: width - 48 - 48 - 8,
  },
  searchQueryResultItem: {
    borderRadius: 8,
    width: '48%',
    height: 48,
    backgroundColor: 'white',
    marginBottom: 8,

    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  searchQueryResultItemText: {
    width: '80%',
  },
  searchQueryResultItemRating: {
    width: '15%',
  },
  button: {
    marginTop: 8,

    alignSelf: 'flex-end',
    width: 48,

    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
  },
  addressWrapper: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
  },
  address: {
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
  },
  addressText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
