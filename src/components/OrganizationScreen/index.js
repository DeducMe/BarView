import React, {useEffect, useState} from 'react';

import OrganizationTabsBlock from './mainOrganizationBlocks/OrganizationTabsBlock';
import EmptyTab from './mainOrganizationBlocks/EmptyTab';
import {getOrganizationInfo} from '../../api/apiQueries';
import ReviewsTab from './reviewsTab/index';
import MainTab from './mainTab/index';
import MenuTab from './menuTab/index';
import OrganizationPhotosCarousel from './mainOrganizationBlocks/OrganizationPhotosCarousel';

import globalStyles, {mainInfo as styles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';

export default function OrganizationScreen({navigation, route}) {
  const [openedTab, setOpenedTab] = useState('Main');
  const [organization, setOrganization] = useState({});
  const [normalizedReviews, setNormalizedReviews] = useState([]);
  const [normalizedReviewsCategories, setNormalizedReviewsCategories] =
    useState([]);

  const {
    organizationimages: organizationImages,
    userreviews: userReviews,
    reviewscategories: reviewsCategories,
    logo,
    rating,
  } = organization;

  function normalizeReviews() {
    setNormalizedReviews(
      userReviews.split('|').map(item => {
        const splitted = item.split('=+=');
        return {
          review: splitted[0] === '' ? 'Без отзыва' : splitted[0],
          author: splitted[1] === '' ? 'Аноним' : splitted[1],
          stars: splitted[2] === '' ? 'Нет оценки' : splitted[2],
        };
      }),
    );
  }

  function normalizeReviewsCategories() {
    setNormalizedReviewsCategories(
      reviewsCategories.split('|').map(item => {
        const splitted = item.split('=+=');
        return {
          title: splitted[0],
          reviewsAmount: splitted[1],
          reviewsLinePositive: splitted[2],
          reviewsLineNegative: splitted[3],
        };
      }),
    );
  }

  useEffect(() => {
    getOrganizationInfo(route.params.organizationId).then(data => {
      if (!data.rows[0]) return;
      setOrganization(data.rows[0]);
    });
  }, []);

  useEffect(() => {
    if (userReviews) normalizeReviews();
    if (reviewsCategories) normalizeReviewsCategories();
  }, [organization]);

  const navigateToTab = tabName => {
    setOpenedTab(tabName);
  };

  if (Object.keys(organization).length)
    return (
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        {organizationImages?.length > 0 && (
          <OrganizationPhotosCarousel
            organizationImages={organizationImages.split('|')}
            logo={logo}
          />
        )}
        <OrganizationTabsBlock navigateToTab={navigateToTab} />
        {openedTab === 'Main' && (
          <MainTab
            rating={rating}
            normalizedReviews={normalizedReviews}
            organization={organization}></MainTab>
        )}
        {openedTab === 'Reviews' && (
          <ReviewsTab
            normalizedReviews={normalizedReviews}
            rating={rating}
            normalizedReviewsCategories={normalizedReviewsCategories}
          />
        )}
        {openedTab === 'Menu' && (
          <MenuTab id={route.params.organizationId}></MenuTab>
        )}
      </ScrollView>
    );
  else return null;
}
