import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import styles from './OtpScreenStyle';
import InputBoxContainer from '../../../components/InputBoxContainer/InputBoxContainer';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { VerifyOTP } from '../../../API/unauthAPI/unauthAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../../redux/slices/authSlice';
import ScreenWrapper from '../../../components/safeAreaViewWrapper/ScreenWrapper';

const OtpScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const prevUser = useSelector(state => state.auth.user);

  // phone = "966598844499" (no +, from Login)
  const { otpsend, phone } = route?.params || {};

  const [user_otp, setUserOtp] = useState('');

  const handleLogin = async () => {
    if (!user_otp || user_otp.length < 4) {
      Alert.alert('Error', 'Please enter a valid OTP');
      return;
    }

    try {
      console.log('📤 Verifying =>', { phone, user_otp });

      // ✅ FIX 1: Pass 'user_otp' key so unauthAPI sends correct param to backend
      const response = await VerifyOTP({
        phone: phone,
        user_otp: user_otp,
      });

      console.log('✅ VerifyOTP Response =>', JSON.stringify(response?.data, null, 2));

      // ✅ FIX 2: Token & id are nested inside response.data.data — not response.data
      const responseData = response?.data;
      const token = responseData?.api_token;
      const userId = responseData?.id;
      const registrationStatus = responseData?.status; // "NEW REGISTRATION" or "EXISTING"

      console.log('🔑 Token =>', token);
      console.log('👤 userId =>', userId);
      console.log('📋 Status =>', registrationStatus);

      if (!token || !userId) {
        Alert.alert('Invalid OTP', 'OTP is incorrect. Please try again.');
        return;
      }

      await AsyncStorage.multiSet([
        ['token', String(token)],
        ['userId', String(userId)],
      ]);

      dispatch(
        login({
          token,
          userId: String(userId),
          user: {
            ...prevUser,
            id: String(userId),
          },
        }),
      );

      // ✅ FIX 3: Handle new vs existing user routing if needed
      if (registrationStatus === 'NEW REGISTRATION') {
        // New user — navigate to profile/registration completion screen
        // Uncomment and update screen name as needed:
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'CompleteProfile' }],
        // });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }

    } catch (error) {
      console.log('❌ OTP Error =>', JSON.stringify(error?.response?.data, null, 2));
      Alert.alert('Error', error?.response?.data?.message || 'OTP verification failed. Try again.');
    }
  };

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            <View style={styles.illustrationContainer}>
              <Image
                source={require('../../../assets/images/login_img.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>Get organised. Make life easier.</Text>
              <Text style={styles.subtitle}>Never lose your Documents.</Text>
            </View>

            <View style={styles.dotsContainer}>
              <InputBoxContainer onChangeOtp={text => setUserOtp(text)} />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default OtpScreen;