import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Geocoder} from 'react-native-yamap';
import {PLUS, MINUS, MARKER} from '../images';
import MapView, {Marker} from 'react-native-maps';
import markersData from '../dataTest.json';
import RNFS from 'react-native-fs';
// Geocoder.geoToAddress({ lat: 37.597576, lon: 55.771899 })
//   .then(data => console.log(data))
const path = '/Users/alexanderzakalsky/projects/Bar/front';

const route = {
  start: {lat: 0, lon: 0},
  end: {lat: 10, lon: 10},
};

export default function ProfileScreen({navigation}) {
  const [markers, setMarkers] = useState([]);
  const [writeResult, setWriteResult] = useState([]);
  const [chosenId, setChosenId] = useState(121926463456);
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
    // let newWr = [];
    // for (let index = 0; index < 4; index++) {
    //   const a = await getOrganizationsJSON(index);
    //   newWr = newWr.concat(a);
    //   console.log(newWr);
    // }
    // setWriteResult(newWr);
  }, []);

  useEffect(() => {
    setMarkersLoading(false);
  }, [markers]);

  function addNewOrganizationMarker(organization) {
    // console.log(organization)
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

  useEffect(() => {
    if (writeResult.length === 0) return;
    let json = JSON.stringify(writeResult, 0, 2);
    RNFS.writeFile(`${path}/myjsonfile.json`, json, 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!');
      })
      .catch(err => {
        console.log(err);
      });
  }, [writeResult]);

  function getOrganizationsJSON(index) {
    return fetch(
      `https://search-maps.yandex.ru/v1/?text=Бар&type=biz&results=2000&skip=${
        index * 500
      }&lang=ru_RU&ll=37.6,55.7&spn=0.8,0.8&&apikey=c63cba92-1973-49ab-9c45-943c69b15467`,
    )
      .then(response => response.json())
      .then(data => {
        const wR = [];

        data?.features?.map(item => {
          wR.push(item);
        });
        return wR;
      });
  }

  function readOrganizationsJSON() {
    getOrganizations(markersData);
    console.log(markersData.length);
  }

  function getOrganizations(data) {
    setMarkersLoading(true);

    const result = [];

    data.map(item => {
      result.push({
        info: item.properties.CompanyMetaData,
        coordinates: {
          longitude: item.geometry.coordinates[0],
          latitude: item.geometry.coordinates[1],
        },
        id: item.properties.CompanyMetaData.id,
      });
    });

    setMarkers(markers.concat(result));
  }

  function openMarkerInfo(item) {
    navigation.navigate('OrganizationScreen', {organization: item});
  }

  async function onZoomPress(where) {
    if (!map && !map.current) {
      return;
    }

    const camera = await map.current.getCamera();
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
    map.current.animateCamera(camera, {duration: 200});
  }
  return (
    <View style={{flex: 1, width: '100%', height: '100%'}}>
      <MapView
        ref={map}
        fitAllMarkers
        zoomEnabled={true}
        initialRegion={{
          latitude: 55.746953111304435,
          longitude: 37.615575661165195,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        style={{flex: 1, width: '100%', height: '100%'}}>
        {!markersLoading &&
          markers.map((item, index) => (
            <Marker
              onPress={openMarkerInfo.bind(this, item)}
              image={MARKER}
              coordinate={item.coordinates}
              style={{width: 26, height: 28}}
              key={index}></Marker>
          ))}
      </MapView>
      {markersLoading && (
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )}
      <View style={styles.buttonsBlock}>
        <TouchableOpacity
          onPress={() => onZoomPress('in')}
          style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Image source={require('../images/plus.png')} style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onZoomPress('out')}
          style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Image source={MINUS} style={styles.icon} />
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
  buttonWrapper: {
    marginTop: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  button: {
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
