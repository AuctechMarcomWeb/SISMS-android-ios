import React, { useEffect, useState } from 'react';
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
import { ResendOTP } from '../../../API/authAPI/authAPI';
import { showToast } from '../../../utils/toast';

const OtpScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const prevUser = useSelector(state => state.auth.user);
  const [timer, setTimer] = useState(30);
  const [resendLoading, setResendLoading] = useState(false);
  // phone = "966598844499" (no +, from Login)
  const { otpsend, phone } = route?.params || {};

  const [user_otp, setUserOtp] = useState('');

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);

      const response = await ResendOTP(phone);

      showToast({
        type: 'success',
        title: 'Success',
        message: response?.data?.message || 'OTP resent successfully',
      });

      setTimer(30);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Error',
        message: error?.response?.data?.message || 'Failed to resend OTP',
      });
    } finally {
      setResendLoading(false);
    }
  };
  const handleLogin = async () => {
    if (!user_otp || user_otp.length < 4) {
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Please enter a valid OTP',
      });
      return;
    }

    try {
      console.log('📤 Verifying =>', { phone, user_otp });

      const response = await VerifyOTP({
        phone: phone,
        user_otp: user_otp,
      });

      console.log(
        '✅ VerifyOTP Response =>',
        JSON.stringify(response?.data, null, 2),
      );

      const responseData = response?.data;
      const token = responseData?.api_token;
      const userId = responseData?.id;
      const registrationStatus = responseData?.status;

      console.log('🔑 Token =>', token);
      console.log('👤 userId =>', userId);
      console.log('📋 Status =>', registrationStatus);

      if (!token || !userId) {
        showToast({
          type: 'error',
          title: 'Invalid OTP',
          message: 'OTP is incorrect. Please try again.',
        });
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

      if (registrationStatus === 'NEW REGISTRATION') {
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
      console.log(
        '❌ OTP Error =>',
        JSON.stringify(error?.response?.data, null, 2),
      );

      showToast({
        type: 'error',
        title: 'Error',
        message:
          error?.response?.data?.message ||
          'OTP verification failed. Try again.',
      });
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
            <View style={styles.resendContainer}>
              {timer > 0 ? (
                <Text style={styles.resendLabel}>Resend OTP in {timer}s</Text>
              ) : (
                <>
                  <Text style={styles.resendLabel}>Didn’t receive code? </Text>
                  <TouchableOpacity
                    onPress={handleResendOtp}
                    disabled={resendLoading}
                  >
                    <Text style={styles.resendButtonText}>
                      {resendLoading ? 'Sending...' : 'Resend'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default OtpScreen;
