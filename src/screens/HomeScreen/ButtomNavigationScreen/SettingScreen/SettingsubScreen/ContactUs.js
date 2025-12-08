import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import NormalHeader from '../../../../../components/NormalHeader/NormalHeader';
import { wp, hp } from '../../../../../utils/Functions/Responsive';
import ScreenWrapper from '../../../../../components/safeAreaViewWrapper/ScreenWrapper';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <ScreenWrapper style={{ paddingTop: 0 }}>
      <View style={styles.container}>
        <NormalHeader title={'Contact Us'} />
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.heading}>Get in Touch</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              cursorColor={'#8B4513'}
              onChangeText={value => handleInputChange('name', value)}
              placeholderTextColor="#999"
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              cursorColor={'#8B4513'}
              onChangeText={value => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phone}
              cursorColor={'#8B4513'}
              onChangeText={value => handleInputChange('phone', value)}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />

            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="How can we help you?"
              value={formData.message}
              onChangeText={value => handleInputChange('message', value)}
              multiline={true}
              cursorColor={'#8B4513'}
              numberOfLines={6}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(5),
  },
  heading: {
    fontSize: wp(6),
    fontFamily: 'poppins_bold',
    fontWeight: '500',
    color: '#8B4513',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? hp(4) : hp(2),
    marginBottom: hp(3),
  },
  formContainer: {
    marginBottom: hp(3),
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8B4513',
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    fontSize: wp(4),
    marginBottom: hp(2),
    color: '#000',
  },
  messageInput: {
    height: hp(18),
    paddingTop: hp(1.5),
  },
  submitButton: {
    backgroundColor: '#8B4513',
    borderRadius: wp(3),
    paddingVertical: hp(2),
    alignItems: 'center',
    marginTop: hp(2.5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: wp(4.5),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});