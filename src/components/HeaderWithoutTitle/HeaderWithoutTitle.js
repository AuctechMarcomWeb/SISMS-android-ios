import React from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import { wp, hp } from '../../utils/Functions/Responsive';

const HeaderWithoutTitle = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default HeaderWithoutTitle;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: wp(4),
    paddingTop: Platform.OS === 'ios' ? hp(1) : hp(2),
    paddingBottom: Platform.OS === 'ios' ? hp(1.2) : hp(2.3),
    backgroundColor: '#FFFFFF',
    alignItems: 'left',
    justifyContent: 'left',
  },

  logo: {
    width: wp(28),
    height: hp(4.2),
  },
});
