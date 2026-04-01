import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

// Custom Icon Component (Simple Text-based icons for better compatibility)
const LeadingIcon = ({ color, icon }) => (
  <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
    <Text style={{ color: color, fontSize: 18, fontWeight: 'bold' }}>
      {icon}
    </Text>
  </View>
);

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={[styles.baseToast, { borderLeftColor: '#10b981' }]}
      contentContainerStyle={styles.contentContainer}
      renderLeadingIcon={() => <LeadingIcon color="#10b981" icon="✓" />}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text1NumberOfLines={1}
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      style={[styles.baseToast, { borderLeftColor: '#f43f5e' }]}
      contentContainerStyle={styles.contentContainer}
      renderLeadingIcon={() => <LeadingIcon color="#f43f5e" icon="✕" />}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),

  info: props => (
    <BaseToast
      {...props}
      style={[styles.baseToast, { borderLeftColor: '#0ea5e9' }]}
      contentContainerStyle={styles.contentContainer}
      renderLeadingIcon={() => <LeadingIcon color="#0ea5e9" icon="ℹ" />}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  baseToast: {
    backgroundColor: '#ffffff',
    height: 'auto',
    minHeight: 75,
    width: '92%',
    borderRadius: 16,
    borderLeftWidth: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  text1: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1f2937', // Darker charcoal color
    letterSpacing: 0.2,
  },
  text2: {
    fontSize: 13,
    color: '#6b7280', // Soft grey
    fontWeight: '500',
    marginTop: 2,
  },
});
