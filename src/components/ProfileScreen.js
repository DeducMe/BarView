import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
const {width} = Dimensions.get('window');

import {Geocoder} from 'react-native-yamap';
import {PLUS, MINUS, MARKER} from '../images';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps-super-cluster';
import {getOrganizationCoords} from '../api/apiQueries';
// Geocoder.geoToAddress({ lat: 37.597576, lon: 55.771899 })
//   .then(data => console.log(data))
const path = '/Users/alexanderzakalsky/projects/Bar/front';

const route = {
  start: {lat: 0, lon: 0},
  end: {lat: 10, lon: 10},
};

export default function ProfileScreen({navigation}) {
  const [markers, setMarkers] = useState([]);
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
  }, []);

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
