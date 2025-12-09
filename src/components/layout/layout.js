import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNav from '../bottomNav/bottomNav';
import ScreenWrapper from '../safeAreaViewWrapper/ScreenWrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Layout = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Main content */}
      <View
        style={[
          styles.content,
          {
            paddingTop: insets.top,
            paddingBottom: hp(1),
          },
        ]}
      >
        {children}
      </View>

      {/* Bottom navigation fixed */}
      <View style={{ paddingBottom: insets.bottom || hp(0.5) }}>
        <BottomNav />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({       
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default Layout;
