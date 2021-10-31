import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import globalStyles, {organizationFeatures as styles} from '../styles';
import {
  WIFI as wifiIcon,
  CARD_PAYMENT as cardPaymentIcon,
  COFFEE_OUT as coffeeOutIcon,
  CRAFT_BEER as craftBeerIcon,
  BUSINESS_LUNCH as businessLunchIcon,
} from '../../../images/index';

export default function OrganizationFeatures({features}) {
  const [normalizedFeatures, setNormalizedFeatures] = useState(null);
  const [menuFeaturesOpen, setMenuFeaturesOpen] = useState(false);
  const {menuFeatures, elseFeatures} = features;

  const normalizeFeatures = () => {
    let normalizedMenuFeatures = menuFeatures.filter(
      (v, i, a) => a.findIndex(t => t === v) === i,
    );
    const kitchen = normalizedMenuFeatures.find(item => item.includes('Кухня'));
    if (kitchen) {
      normalizedMenuFeatures.splice(
        normalizedMenuFeatures.findIndex(item => item === kitchen),
        1,
      );
    }
    normalizedMenuFeatures = normalizedMenuFeatures
      .sort((a, b) => {
        const sortWords = ['Цены', 'Средний счёт', 'Цена бокала'];
        for (word of sortWords) {
          if (a.includes(word)) return -1;
          if (b.includes(word)) return 1;
        }
        return a > b ? 1 : -1;
      })
      .map(item => {
        const splitted = item.split(':');

        return {
          key: splitted[0],
          value: splitted[1],
          long: splitted[1].length > 20 || splitted[0].length > 20,
        };
      });

    const normalizedElseFeatures = {
      wifi: elseFeatures.includes('Wi-Fi'),
      cardPayment: elseFeatures.includes('Оплата картой'),
      coffeeOut: elseFeatures.includes('Кофе с собой'),
      craftBeer: elseFeatures.includes('Крафтовое пиво'),
      businessLunch: elseFeatures.includes('Бизнес-ланч'),
    };

    return {normalizedMenuFeatures, normalizedElseFeatures, kitchen};
  };

  useEffect(() => {
    setNormalizedFeatures(normalizeFeatures());
  }, []);

  if (normalizedFeatures) {
    const {wifi, cardPayment, coffeeOut, craftBeer, businessLunch} =
      normalizedFeatures.normalizedElseFeatures;
    return (
      <View
        style={[
          styles.featuresContainer,
          globalStyles.flexRow,
          globalStyles.justifyBetween,
        ]}>
        <View style={styles.normalizedMenuFeaturesContainer}>
          {normalizedFeatures.normalizedMenuFeatures.map((item, i) => {
            if ((i >= 4 && !menuFeaturesOpen) || item.long) return;
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}>
                <Text style={styles.menuFeatureTextKey}>{item.key}:</Text>

                <Text
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  style={styles.menuFeatureTextValue}>
                  {item.value}
                </Text>
              </View>
            );
          })}
          {!!normalizedFeatures.kitchen && (
            <Text style={styles.kitchenText}>{normalizedFeatures.kitchen}</Text>
          )}
        </View>
        <View style={styles.normalizedElseFeaturesContainer}>
          {wifi && (
            <View
              style={[
                styles.elseFeature,
                globalStyles.flexRow,
                globalStyles.alignCenter,
              ]}>
              <Image style={styles.icon} source={wifiIcon}></Image>
              <Text style={styles.elseFeatureText}>Wi-fi</Text>
            </View>
          )}
          {cardPayment && (
            <View
              style={[
                styles.elseFeature,
                globalStyles.flexRow,
                globalStyles.alignCenter,
              ]}>
              <Image style={styles.icon} source={cardPaymentIcon}></Image>
              <Text style={styles.elseFeatureText}>Оплата картой</Text>
            </View>
          )}
          {coffeeOut && (
            <View
              style={[
                styles.elseFeature,
                globalStyles.flexRow,
                globalStyles.alignCenter,
              ]}>
              <Image style={styles.icon} source={coffeeOutIcon}></Image>
              <Text style={styles.elseFeatureText}>Кофе на вынос</Text>
            </View>
          )}
          {craftBeer && (
            <View
              style={[
                styles.elseFeature,
                globalStyles.flexRow,
                globalStyles.alignCenter,
              ]}>
              <Image style={styles.icon} source={craftBeerIcon}></Image>
              <Text style={styles.elseFeatureText}>Крафт</Text>
            </View>
          )}
          {businessLunch && (
            <View
              style={[
                styles.elseFeature,
                globalStyles.flexRow,
                globalStyles.alignCenter,
              ]}>
              <Image style={styles.icon} source={businessLunchIcon}></Image>
              <Text style={styles.elseFeatureText}>Бизнес-ланч</Text>
            </View>
          )}
        </View>
      </View>
    );
  } else return null;
}
