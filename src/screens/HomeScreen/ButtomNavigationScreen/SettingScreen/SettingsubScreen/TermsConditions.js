import { StyleSheet, Text, View, ScrollView, Image, Platform } from 'react-native';
import React from 'react';
import { wp, hp } from '../../../../../utils/Functions/Responsive';
import ScreenWrapper from '../../../../../components/safeAreaViewWrapper/ScreenWrapper';

const TermsConditions = () => {
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

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Terms & Conditions</Text>

            <Text style={styles.welcomeText}>
              Welcome to SI-Print! These Terms and Conditions ("Agreement")
              govern your use of the SI-Print website and services. By accessing
              or using our services, you agree to comply with and be bound by
              the terms and conditions described below. If you do not agree to
              these terms, please do not use our services.
            </Text>

            <Text style={styles.sectionTitle}>User Registration</Text>

            <Text style={styles.listItem}>
              1. You must register for an account to access certain features of
              our services
            </Text>

            <Text style={styles.listItem}>
              2. You agree to provide accurate, current, and complete
              information during the registration process and to update such
              information to keep it accurate, current, and complete
            </Text>

            <Text style={styles.listItem}>
              3. You are responsible for maintaining the confidentiality of your
              account credentials and for any activities that occur under your
              account.
            </Text>

            <Text style={styles.sectionTitle}>User Responsibilities</Text>

            <Text style={styles.subText}>
              We use the information we collect for the following purposes
            </Text>

            <Text style={styles.listItem}>
              1. You agree to use our services in compliance with all applicable
              laws and regulations
            </Text>

            <Text style={styles.listItem}>
              2. You are solely responsible for the content you upload or share
              on our platform.
            </Text>

            <Text style={styles.listItem}>
              3. You agree not to engage in any unlawful or prohibited
              activities while using our services
            </Text>

            <Text style={styles.sectionTitle}>Intellectual Property</Text>

            <Text style={styles.listItem}>
              1. All content and materials on our website, including but not
              limited to text, graphics, logos, images, and software, are the
              property of SI-Print and are protected by copyright and other
              intellectual property laws
            </Text>

            <Text style={styles.listItem}>
              2. You may use the content for personal and non-commercial
              purposes. Any other use, including reproduction, modification,
              distribution, or republication, without our prior written consent,
              is prohibited.
            </Text>

            <Text style={styles.sectionTitle}>Subscription and Payments</Text>

            <Text style={styles.listItem}>
              1. We offer subscription plans for our services. By subscribing,
              you agree to pay the applicable fees as outlined in our pricing
              information.
            </Text>

            <Text style={styles.listItem}>
              2. Payments are processed securely through our authorized payment
              processor.
            </Text>

            <Text style={styles.listItem}>
              3. Subscription fees are non-refundable except as expressly stated
              in our refund policy.
            </Text>

            <Text style={styles.sectionTitle}>Termination</Text>

            <Text style={styles.listItem}>
              1. We reserve the right to terminate or suspend your account at
              our discretion, without notice, for any reason, including but not
              limited to a violation of these Terms and Conditions
            </Text>

            <Text style={styles.listItem}>
              2. Upon termination, you will no longer have access to your
              account and any associated data.
            </Text>

            <Text style={styles.sectionTitle}>Dispute Resolution</Text>

            <Text style={styles.listItem}>
              Any disputes arising from or relating to this Agreement will be
              resolved through arbitration in accordance with the rules of the
              [Insert Arbitration Organization] by a single arbitrator appointed
              in accordance with those rules.
            </Text>

            <Text style={styles.sectionTitle}>Limitation of Liability</Text>

            <Text style={styles.listItem}>
              SI-Print and its affiliates, directors, officers, employees, and
              agents shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly.
            </Text>

            <Text style={styles.sectionTitle}>Governing Law</Text>

            <Text style={styles.listItem}>
              This Agreement is governed by and construed in accordance with the
              laws of [Insert Jurisdiction], without regard to its conflict of
              law principles.
            </Text>

            <Text style={styles.sectionTitle}>
              Changes to Terms and Conditions
            </Text>

            <Text style={styles.listItem}>
              We reserve the right to update or modify these Terms and
              Conditions at any time. Any changes will be posted on this page
              with a revised effective date.
            </Text>

            <Text style={styles.sectionTitle}>Contact Us</Text>

            <Text style={styles.listItem}>
              If you have any questions or concerns regarding these Terms and
              Conditions, please contact us at: [Insert Contact Information]
            </Text>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? hp(2) : 0,
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
  },
  logo: {
    width: wp(30),
    height: hp(5),
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: hp(10),
  },
  content: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
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