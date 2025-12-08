import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Image,
  Easing,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Path, Polygon } from 'react-native-svg';

import AboutHero from '../../../../../assets/images/aboutHero.png';
import SpeakerHero from '../../../../../assets/images/speaker.png';
import BellHero from '../../../../../assets/images/bellIcon.png';
import { hp, wp } from '../../../../../utils/Functions/Responsive';
import colors from '../../../../../utils/Functions/colors';
import AboutVideo from '../../../../../components/aboutVideo/aboutVideo';
import ScreenWrapper from '../../../../../components/safeAreaViewWrapper/ScreenWrapper';

const { width } = Dimensions.get('window');

const AboutUs = () => {
  // Animated values
  const rotateDots = useRef(new Animated.Value(0)).current;
  const rotateAsterisk = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Dots animation
    Animated.loop(
      Animated.timing(rotateDots, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // Asterisk animation
    Animated.loop(
      Animated.timing(rotateAsterisk, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateDots, rotateAsterisk]);

  const dotsRotation = rotateDots.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const asteriskRotation = rotateAsterisk.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ScreenWrapper style={{ paddingTop: 0 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Rotating Dots (Arranged in a circular path) */}
      <Animated.View
        style={[
          styles.dotsContainer,
          {
            transform: [{ rotate: dotsRotation }],
          },
        ]}
      >
        <View style={[styles.dot, { transform: [{ translateX: -30 }, { translateY: -30 }] }]} />
        <View style={[styles.dot, { transform: [{ translateX: 30 }, { translateY: -30 }] }]} />
        <View style={[styles.dot, { transform: [{ translateX: 0 }, { translateY: 30 }] }]} />
      </Animated.View>

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image source={AboutHero} style={styles.heroImage} />
        </View>

        {/* Text Section */}
        <View style={styles.textSection}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              SI-Print - Receipt and Invoice Management
            </Text>
          </View>
          
          <Text style={styles.heading}>
            Ultimate solution for Receipt and Invoice Management
          </Text>
          
          <Text style={styles.paragraph}>
            Discover the ultimate solution for hassle-free shopping receipt and
            invoice management with Project SI-Print. Experience a Streamlined
            approach to storing, accessing, and handling your receipts online. No
            more paper clutter, no more lost documents - just effortless
            organization at your fingertips.
          </Text>

          {[
            'Simplify Storage and Access',
            'Effortless Retrieval',
            'Seamless PDF Handling',
            'Stay Within Your Limit',
          ].map((item, idx) => (
            <View style={styles.listItem} key={idx}>
              <Icon name="check-circle" size={20} color={colors.golden} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Why Choose Us */}
        <View style={styles.whyChooseContainer}>
          {/* Zigzag Top */}
          <Svg
            height={10}
            width="100%"
            viewBox="0 0 100 5"
            preserveAspectRatio="none"
            style={styles.zigzagTop}
          >
            <Polygon
              points="0,5 2.5,2 5,5 7.5,2 10,5 12.5,2 15,5 17.5,2 20,5 22.5,2 25,5 27.5,2 30,5 32.5,2 35,5 37.5,2 40,5 42.5,2 45,5 47.5,2 50,5 52.5,2 55,5 57.5,2 60,5 62.5,2 65,5 67.5,2 70,5 72.5,2 75,5 77.5,2 80,5 82.5,2 85,5 87.5,2 90,5 92.5,2 95,5 97.5,2 100,5"
              fill="#111"
            />
          </Svg>

          {/* Video Section */}
          <AboutVideo />

          <View style={styles.whyChoose}>
            {/* Rotating Asterisk */}
            <Animated.View
              style={[
                styles.asterisk,
                { transform: [{ rotate: asteriskRotation }] },
              ]}
            >
              <Text style={styles.asteriskText}>*</Text>
            </Animated.View>

            {/* Heading with wavy line */}
            <View style={styles.headingRow}>
              <Svg height={20} width={60} viewBox="0 0 100 20">
                <Path
                  d="M0 10 Q 10 0, 20 10 T 40 10 T 60 10 T 80 10 T 100 10"
                  fill="none"
                  stroke={colors.golden}
                  strokeWidth="4"
                />
              </Svg>
              <Text style={styles.subHeading}>Why Choose Us</Text>
            </View>
            
            <Text style={styles.whyChooseDescription}>
              Experience receipt and invoice management with SI-Print. Say
              goodbye to paper clutter and hello to convenience.
            </Text>

            {/* Feature 1 */}
            <View style={styles.featureItem}>
              <Image source={SpeakerHero} style={styles.featureIcon} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  Streamlined Organization
                </Text>
                <Text style={styles.featureText}>
                  Centralize your receipts and invoices in one secure location.
                  Our user-friendly platform ensures easy access and management
                  whenever you need it.
                </Text>
              </View>
            </View>

            {/* Feature 2 */}
            <View style={styles.featureItem}>
              <Image source={BellHero} style={styles.featureIcon} />
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>PDF Made Simple</Text>
                <Text style={styles.featureText}>
                  Easily handle PDF receipts – download, upload, and organize
                  seamlessly. Your sensitive data stays secure throughout the
                  process.
                </Text>
              </View>
            </View>

            {/* Zigzag Bottom */}
            <Svg
              height={10}
              width="100%"
              viewBox="0 0 100 5"
              preserveAspectRatio="none"
              style={styles.zigzagBottom}
            >
              <Polygon
                points="0,0 2.5,3 5,0 7.5,3 10,0 12.5,3 15,0 17.5,3 20,0 22.5,3 25,0 27.5,3 30,0 32.5,3 35,0 37.5,3 40,0 42.5,3 45,0 47.5,3 50,0 52.5,3 55,0 57.5,3 60,0 62.5,3 65,0 67.5,3 70,0 72.5,3 75,0 77.5,3 80,0 82.5,3 85,0 87.5,3 90,0 92.5,3 95,0 97.5,3 100,0"
                fill="#111"
              />
            </Svg>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: hp(10),
  },
  header: {
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'android' ? hp(2) : 0,
    paddingBottom: hp(2),
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: { 
        elevation: 3 
      },
    }),
  },
  logo: { 
    width: wp(30), 
    height: hp(5) 
  },
  dotsContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? hp(12) : hp(10),
    left: wp(15),
    zIndex: 0,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: colors.pink || '#FF69B4',
    borderRadius: 4,
    position: 'absolute',
  },
  heroContainer: {
    marginTop: hp(2),
    paddingHorizontal: wp(5),
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: hp(40),
    borderRadius: 15,
    resizeMode: 'cover',
  },
  textSection: { 
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
    gap: hp(1.5),
  },
  badge: {
    backgroundColor: colors.golden || '#B8860B',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: wp(3.2),
    color: '#000',
    fontWeight: '600',
  },
  heading: {
    fontSize: wp(5),
    fontWeight: '700',
    color: colors.blue || '#1E40AF',
    lineHeight: wp(7),
    letterSpacing: 0.5,
  },
  paragraph: {
    fontSize: wp(3.8),
    color: '#555',
    lineHeight: wp(6),
    textAlign: 'justify',
  },
  listItem: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: wp(3),
    marginVertical: hp(0.5),
  },
  listText: { 
    fontSize: wp(3.8),
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  whyChooseContainer: {
    backgroundColor: '#111',
    marginTop: hp(4),
    position: 'relative',
  },
  zigzagTop: { 
    position: 'absolute', 
    top: -10, 
    left: 0, 
    right: 0, 
    zIndex: 10 
  },
  whyChoose: {
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
    paddingBottom: hp(5),
    backgroundColor: '#111',
    position: 'relative',
  },
  asterisk: { 
    position: 'absolute', 
    top: -hp(2), 
    right: wp(10),
    opacity: 0.3,
  },
  asteriskText: {
    fontSize: wp(20),
    color: '#333',
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    marginBottom: hp(2),
  },
  subHeading: {
    fontSize: wp(5),
    fontWeight: '700',
    color: '#fff',
  },
  whyChooseDescription: {
    fontSize: wp(3.8),
    color: '#fff',
    fontWeight: '600',
    lineHeight: wp(6),
    marginBottom: hp(3),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp(3),
    gap: wp(4),
  },
  featureIcon: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: wp(4.2),
    fontWeight: '700',
    color: '#fff',
    marginBottom: hp(1),
  },
  featureText: {
    fontSize: wp(3.5),
    color: '#ddd',
    lineHeight: wp(5.5),
  },
  zigzagBottom: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default AboutUs;