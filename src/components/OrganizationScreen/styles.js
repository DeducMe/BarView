import {StyleSheet} from 'react-native';

export const mainInfo = StyleSheet.create({
  mainHeaderContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15,
  },
  mainHeaderText: {
    fontSize: 20,
    fontWeight: '600',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  logo: {
    position: 'absolute',
    top: 130,
    left: 10,
    zIndex: 1,
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#fff',
  },
  logoImage: {
    width: 70,
    zIndex: 1,
    height: 70,
  },
  mainInfoBlockContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainInfoBlockLeftContainer: {
    width: '55%',
  },
  mainInfoBlockRightContainer: {
    width: '40%',
    maxWidth: 145,
  },
  mainInfoBlockAddress: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  hoursInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openMenuBtn: {
    marginLeft: 5,
    width: 9,
    height: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
  },
  starIcon: {
    width: 24,
    height: 24,
  },
});

export default StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
});

export const organizationFeatures = StyleSheet.create({
  featuresContainer: {
    marginHorizontal: 15,
  },
  kitchenText: {
    marginTop: 10,
    fontSize: 12,
  },
  menuFeatureTextKey: {
    fontSize: 13,
    maxWidth: '70%',
  },
  menuFeatureTextValue: {
    fontSize: 14,
    maxWidth: 120,
  },
  icon: {width: 18, height: 18, marginRight: 5},
  normalizedMenuFeaturesContainer: {width: '55%'},
  normalizedElseFeaturesContainer: {width: '40%', maxWidth: 145},
  elseFeature: {
    marginBottom: 5,
  },
  elseFeatureText: {
    fontSize: 14,
  },
});
