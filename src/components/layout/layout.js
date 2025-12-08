import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import BottomNav from '../bottomNav/bottomNav';
import ScreenWrapper from '../safeAreaViewWrapper/ScreenWrapper';

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      
      {/* Main content area */}
      <ScreenWrapper edges={['left', 'right', 'bottom']} style={styles.content}>
        {children}
      </ScreenWrapper>

      {/* Fixed bottom navigation */}
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({       
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 20 : 0, // iOS top push removed
    paddingBottom: 0,
  },
});

export default Layout;
