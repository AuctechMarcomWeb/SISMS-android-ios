import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Layout from '../../../../components/layout/layout';

const Sms = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.noSmsContainer}>
          <Text style={styles.noSmsText}>No SMS found</Text>
        </View>
      </View>
    </Layout>
  );
};

export default Sms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  noSmsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noSmsText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '500',
  },
});