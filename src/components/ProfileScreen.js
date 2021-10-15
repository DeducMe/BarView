import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import YaMap, {Marker, Geocoder} from 'react-native-yamap';
import {PLUS, MINUS, MARKER} from '../images';
import RNFS from 'react-native-fs';
// Geocoder.geoToAddress({ lat: 37.597576, lon: 55.771899 })
//   .then(data => console.log(data))
const path = '/Users/alexanderzakalsky/projects/Bar/front';

const route = {
  start: {lat: 0, lon: 0},
  end: {lat: 10, lon: 10},
};

export default function ProfileScreen() {
  const [markers, setMarkers] = useState([]);
  const [writeResult, setWriteResult] = useState([]);
  const [chosenId, setChosenId] = useState(121926463456);
  const [markersLoading, setMarkersLoading] = useState(false);
  YaMap.init('6900635a-0c4f-4265-a600-7e9476e079f1');
  Geocoder.init('8f3ed51c-817e-4946-ac9f-ed375107d4f3');
  const map = useRef(null);
  useEffect(() => {
    if (map.current.setCenter)
      map.current.setCenter(
        {lat: 55.7221513871823, lon: 37.63555933517637},
        10,
        0,
        0,
        0,
      );
    readOrganizationsJSON();
    // for (let index = 0; index < 2; index++) {
    //   getOrganizationsJSON(index);
    // }
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
    fetch(
      `https://search-maps.yandex.ru/v1/?text=Бар&type=biz&results=2000&skip=${
        index * 10
      }&lang=ru_RU&ll=37.6,55.7&spn=0.8,0.8&&apikey=c63cba92-1973-49ab-9c45-943c69b15467`,
    )
      .then(response => response.json())
      .then(data => {
        const wR = [];

        data.features.map(item => {
          wR.push(item);
        });

        setWriteResult(writeResult.concat(wR));
      });
  }

  function readOrganizationsJSON() {
    RNFS.readFile(`${path}/myjsonfile.json`, 'utf8')
      .then(file => {
        const data = JSON.parse(file);
        data.length = 50;
        getOrganizations(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getOrganizations(data) {
    setMarkersLoading(true);

    const result = [];

    data.map(item => {
      result.push({
        info: item.properties.CompanyMetaData.address,
        coordinates: {
          lon: item.geometry.coordinates[0],
          lat: item.geometry.coordinates[1],
        },
        id: item.properties.CompanyMetaData.id,
      });
    });

    setMarkers(markers.concat(result));
  }

  function openMarkerInfo(id) {
    console.log('changed to ', id);
    setChosenId(id);
  }

  async function zoomUp() {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setZoom(position.zoom * 1.1, 0.1);
    }
  }

  async function zoomDown() {
    const position = await getCurrentPosition();
    if (map.current) {
      map.current.setZoom(position.zoom * 0.9, 0.1);
    }
  }
  return (
    <View style={{flex: 1, width: '100%', height: '100%'}}>
      <YaMap
        ref={map}
        fitAllMarkers
        // onMapPress={(event) => addNewMarker(event.nativeEvent)}

        style={{flex: 1, width: '100%', height: '100%'}}>
        {!markersLoading &&
          markers.map((item, index) => (
            <Marker
              onPress={openMarkerInfo.bind(this, item.id)}
              source={MARKER}
              point={item.coordinates}
              key={index}></Marker>
          ))}
      </YaMap>
      <View style={styles.buttonsBlock}>
        <TouchableOpacity onPress={zoomUp} style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Image source={PLUS} style={styles.icon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={zoomDown} style={styles.buttonWrapper}>
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
