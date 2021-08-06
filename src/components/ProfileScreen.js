import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { event } from 'react-native-reanimated';
import YaMap, { Marker, Geocoder } from 'react-native-yamap';
import { PLUS, MINUS } from '../images'
// Geocoder.geoToAddress({ lat: 37.597576, lon: 55.771899 })
//   .then(data => console.log(data))

const route = {
  start: { lat: 0, lon: 0 },
  end: { lat: 10, lon: 10 },
};

export default function ProfileScreen() {
  const [markers, setMarkers] = useState([])
  YaMap.init('6900635a-0c4f-4265-a600-7e9476e079f1');
  Geocoder.init('8f3ed51c-817e-4946-ac9f-ed375107d4f3');
  const map = useRef(null);
  useEffect(() => {
    if (map.current.setCenter) map.current.setCenter({ "lat": 55.7221513871823, "lon": 37.63555933517637 }, 10, 0, 0, 0)


  }, [])

  function addNewMarker(marker) {
    delete marker.target
    setMarkers(markers.concat(marker))
  }

  function getCurrentPosition() {
    return new Promise((resolve) => {
      if (map.current) {
        map.current.getCameraPosition((position) => {
          resolve(position);
        });
      }
    });
  }

  async function zoomUp() {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setZoom(position.zoom * 1.1, 0.1);
    }
  };

  async function zoomDown() {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setZoom(position.zoom * 0.9, 0.1);
    }
  };
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <YaMap
        ref={map}
        fitAllMarkers
        showUserPosition
        onMapPress={(event) => addNewMarker(event.nativeEvent)}
        userLocationIcon={{ uri: 'https://www.clipartmax.com/png/middle/180-1801760_pin-png.png' }}
        style={{ flex: 1, width: '100%', height: '100%' }}
      >
        <Marker point={{ lat: 57.3112724546205, lon: 41.30859375 }}></Marker>
        {markers.map((item, index) => {
          console.log(item)
          return <Marker point={item} key={index} />
        }
        )}
      </YaMap>
      <View style={styles.buttonsBlock}>
        <TouchableOpacity onPress={zoomUp} style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Image source={PLUS} style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={zoomDown}
          style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Image source={MINUS} style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>

  )
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
