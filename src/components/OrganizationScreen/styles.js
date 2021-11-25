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
  blockSeparator: {
    alignSelf: 'center',
    marginVertical: 15,
    height: 1,
    width: '80%',
    backgroundColor: '#C4C4C4',
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
  fullImageBtn: {
    position: 'absolute',
    top: 184,
    right: 10,
    zIndex: 1,
    borderRadius: 60,

    padding: 5,
    backgroundColor: '#fff',
  },
  fullImageBtnIcon: {
    width: 15,
    zIndex: 1,
    height: 15,
  },
  logoImage: {
    borderRadius: 15,

    width: 70,
    zIndex: 1,
    height: 70,
  },
  mainInfoBlockContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainInfoBlockLeftContainer: {
    width: '60%',
  },
  mainInfoBlockRightContainer: {
    width: '35%',
    maxWidth: 145,
    marginBottom: 5,
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
    fontSize: 12,
    fontWeight: '500',
    alignSelf: 'flex-end',
  },
  starIcon: {
    width: 19,
    height: 19,
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
    fontSize: 11,
  },
  menuFeatureTextKey: {
    fontSize: 12,
    maxWidth: '70%',
  },
  menuFeatureTextValue: {
    fontSize: 14,
    maxWidth: 120,
  },
  icon: {width: 18, height: 18, marginRight: 5},
  normalizedMenuFeaturesContainer: {width: '60%'},
  normalizedElseFeaturesContainer: {width: '35%', maxWidth: 145},
  elseFeature: {
    marginBottom: 5,
  },
  elseFeatureText: {
    fontSize: 12,
  },
});
export const navigationTabs = StyleSheet.create({
  navigationTabBtn: {
    width: 110,
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 5,
  },
  navigationTabText: {
    textAlign: 'center',
    fontWeight: '500',
  },
});

export const reviewsTabStyles = StyleSheet.create({
  reviewsContainer: {
    marginHorizontal: 10,
  },
  commonInfoReviews: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 5,
  },
  bigStarIcon: {
    width: 40,
    height: 40,
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    width: 40,
  },
  reviewCategoryContainer: {
    marginLeft: 15,
    marginBottom: 10,
  },
  reviewCategoryTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  reviewContainer: {
    marginTop: 15,
  },
  reviewBody: {
    marginTop: 3,
  },
});
