import React, {useState, useEffect} from 'react';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import globalStyles, {reviewsTabStyles as styles} from '../../styles';
import StarBlock from '../mainTab/StarBlock';
import MaskedView from '@react-native-masked-view/masked-view';

import {
  BIG_STAR_FULL as starFull,
  BIG_STAR_EMPTY as starEmpty,
} from '../../../images/index';

export default function reviewsTab({
  normalizedReviews,
  normalizedReviewsCategories,
  rating,
}) {
  const reviewsAmount = normalizedReviews?.length;

  const renderReview = ({item}) => {
    return (
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewCategoryTitle}>{item.author}</Text>
        <StarBlock noNumber rating={item.stars} />
        <Text style={styles.reviewBody}>{item.review}</Text>
      </View>
    );
  };

  const renderReviewCategory = ({item}) => {
    return (
      <View style={styles.reviewCategoryContainer}>
        <Text style={styles.reviewCategoryTitle}>{item.title}</Text>
        <View style={[globalStyles.flexRow, {width: 120}]}>
          <View
            style={{
              height: 5,
              borderRadius: 2,
              width: `${item.reviewsLinePositive}%`,
              backgroundColor: 'green',
            }}></View>
          <View
            style={{
              height: 5,
              borderRadius: 2,

              width: `${item.reviewsLineNegative}%`,
              backgroundColor: 'red',
            }}></View>
        </View>
        <Text>{item.reviewsAmount}</Text>
      </View>
    );
  };

  return (
    <View style={styles.reviewsContainer}>
      {normalizedReviewsCategories.length > 0 && (
        <View
          style={[
            globalStyles.flexRow,
            globalStyles.justifyBetween,
            styles.commonInfoReviews,
          ]}>
          <View style={[globalStyles.alignCenter, styles.bigStarBlock]}>
            <MaskedView
              maskElement={
                <View
                  style={{
                    width: 40 * (rating / 5),
                    height: 40,
                    backgroundColor: '#fff',
                  }}></View>
              }>
              <Image style={{width: 40, height: 40}} source={starFull}></Image>
            </MaskedView>
            <View style={{position: 'absolute'}}>
              <Image style={{width: 40, height: 40}} source={starEmpty}></Image>
            </View>
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={[globalStyles.justifyBetween]}
            keyExtractor={(item, i) => i}
            numColumns={2}
            data={normalizedReviewsCategories}
            renderItem={renderReviewCategory}
          />
        </View>
      )}
      <FlatList
        scrollEnabled={false}
        keyExtractor={(item, i) => i}
        data={normalizedReviews}
        ListHeaderComponent={
          <View
            style={[
              globalStyles.flexRow,
              globalStyles.justifyBetween,
              globalStyles.alignCenter,
            ]}>
            <Text style={styles.reviewsAmountText}>
              {reviewsAmount} отзывов
            </Text>
            <TouchableOpacity>
              <Text style={styles.filterReviewsText}>По умолчанию</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={renderReview}
      />
    </View>
  );
}
