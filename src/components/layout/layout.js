import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNav from '../bottomNav/bottomNav';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
          },
        ]}
      >
        {children}
      </View>

      {/* Bottom navigation */}
      <BottomNav />
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