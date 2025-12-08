import { StyleSheet, Text, View, ScrollView, Image, Platform } from 'react-native';
import React from 'react';
import {wp, hp} from '../../../../../utils/Functions/Responsive'
import ScreenWrapper from '../../../../../components/safeAreaViewWrapper/ScreenWrapper';

const PrivacyPolicy = () => {
  return (
    <ScreenWrapper style={{ paddingTop: 0 }}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: hp(10)}}>
        <View style={styles.content}>
          <Text style={styles.title}>Privacy Policy</Text>
          
          <Text style={styles.welcomeText}>
            Welcome to SI-Print! At SI-Print, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices concerning the collection, use, and sharing of your information. By accessing or using our services, you consent to the practices described in this Privacy Policy.
          </Text>

          <Text style={styles.sectionTitle}>Information We Collect</Text>
          
          <Text style={styles.subText}>
            We may collect the following types of information when you use our services:
          </Text>
          
          <Text style={styles.listItem}>
            1. Personal Information: We may collect your phone number, email address, and profile photo to facilitate account creation, authentication, and communication with you.
          </Text>
          
          <Text style={styles.listItem}>
            2. Receipts and Invoices: We collect and store PDF receipts and invoices that you upload to our platform for the purpose of providing you with access to your shopping records.
          </Text>

          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          
          <Text style={styles.subText}>
            We use the information we collect for the following purposes:
          </Text>
          
          <Text style={styles.listItem}>
            1. Account Management: We use your phone number and email address for account verification, account-related communication, and account recovery.
          </Text>
          
          <Text style={styles.listItem}>
            2. Identification: Your profile photo is used to identify you within our service.
          </Text>
          
          <Text style={styles.listItem}>
            3. Receipts and Invoices: We store and organize the PDF receipts and invoices you upload to help you manage your shopping records conveniently.
          </Text>
          
          <Text style={styles.listItem}>
            4. Communication: We may use your contact information to communicate with you about your account, updates to our services, and promotional offers (if you opt in).
          </Text>

          <Text style={styles.sectionTitle}>Sharing of Information</Text>
          
          <Text style={styles.listItem}>
            We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted service providers and partners who assist us in operating our services. We may also share aggregated and anonymized data for analytical purposes.
          </Text>

          <Text style={styles.sectionTitle}>Security Measures</Text>
          
          <Text style={styles.listItem}>
            We take data security seriously and employ industry-standard security measures to protect your information. However, no method of transmission over the internet or electronic storage is entirely secure, so we cannot guarantee absolute security.
          </Text>

          <Text style={styles.sectionTitle}>User Rights</Text>
          
          <Text style={styles.listItem}>
            You have the right to access, correct, or delete your personal information held by us. You can exercise these rights by contacting us through the provided contact information.
          </Text>

          <Text style={styles.sectionTitle}>Subscription and Payments</Text>
          
          <Text style={styles.listItem}>
            If you subscribe to our services, we collect and process payment information as necessary to complete the transaction securely. Please refer to our Terms and Conditions for details on subscription plans and payments.
          </Text>

          <Text style={styles.sectionTitle}>Changes to this Privacy Policy</Text>
          
          <Text style={styles.listItem}>
            We may update this Privacy Policy from time to time to reflect changes in our practices and services. Any updates will be posted on this page, and the effective date will be revised accordingly. Your continued use of our services after such changes constitutes acceptance of the updated Privacy Policy.
          </Text>

          <Text style={styles.sectionTitle}>Contact Us</Text>
          
          <Text style={styles.listItem}>
            If you have any questions or concerns regarding this Privacy Policy, please contact us at: [Insert Contact Information]
          </Text>
        </View>
      </ScrollView>
    </View>
    </ScreenWrapper>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
    paddingTop: Platform.OS === 'android' ? hp(2) : 0, // Android ke liye top padding
  },
  logo: {
    width: wp(30),
    height: hp(5),
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  title: {
    fontSize: wp(6.5),
    fontWeight: 'bold',
    color: '#B8860B',
    textAlign: 'center',
    marginBottom: hp(2.5),
  },
  welcomeText: {
    fontSize: wp(3.8),
    color: '#333333',
    lineHeight: wp(5.5),
    marginBottom: hp(2.5),
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: '#000000',
    marginTop: hp(2),
    marginBottom: hp(1.5),
  },
  subText: {
    fontSize: wp(3.8),
    color: '#333333',
    lineHeight: wp(5.5),
    marginBottom: hp(1),
    fontWeight: '500',
  },
  listItem: {
    fontSize: wp(3.8),
    color: '#333333',
    lineHeight: wp(5.5),
    marginBottom: hp(1.5),
    textAlign: 'justify',
  },
});