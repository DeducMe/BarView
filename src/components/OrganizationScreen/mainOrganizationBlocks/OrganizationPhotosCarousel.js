import React, {useState, useRef} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {FULLSCREEN_BTN as fullScreenBtnIcon} from '../../../images/index';
import {mainInfo as styles} from '../../styles';
const {width} = Dimensions.get('window');

export default function OrganizationPhotosCarousel({organizationImages, logo}) {
  const [imageFullOpened, setImageFullOpened] = useState(false);
  const photoList = useRef();

  const renderItem = ({item}) => {
    return (
      <Image
        style={{
          width: width,
          height: imageFullOpened ? 515 : 220,
          resizeMode: imageFullOpened ? 'contain' : 'cover',
          backgroundColor: '#000',
        }}
        source={{uri: item}}
      />
    );
  };
  return (
    <View style={{position: 'relative'}}>
      {!!logo && (
        <View style={[styles.logo, imageFullOpened && {top: 425}]}>
          <Image style={styles.logoImage} source={{uri: logo}} />
        </View>
      )}
      <TouchableOpacity
        onPress={() => setImageFullOpened(!imageFullOpened)}
        style={[styles.fullImageBtn, imageFullOpened && {top: 480}]}>
        <Image style={styles.fullImageBtnIcon} source={fullScreenBtnIcon} />
      </TouchableOpacity>
      <FlatList
        ref={photoList}
        scrollEventThrottle={1}
        keyExtractor={(item, index) => index}
        horizontal
        data={organizationImages}
        pagingEnabled
        renderItem={renderItem}
      />
    </View>
  );
}
