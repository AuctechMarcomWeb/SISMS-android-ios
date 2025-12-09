import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
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
  const { otpsend, phone } = route?.params || {};

  const [user_otp, setUserOtp] = useState("");

  const handleLogin = async () => {
    try {
      const response = await VerifyOTP({ phone, user_otp });
      const token = response?.data?.api_token;
      const userId = response?.data?.id?.toString();

      if (token) {
        await AsyncStorage.multiSet([
          ["token", token],
          ["userId", userId],
        ]);

        dispatch(
          login({
            token,
            userId,
            user: { ...prevUser, id: userId },
          })
        );
      } else {
        Alert.alert("Invalid OTP", "Please try again");
      }
    } catch (error) {
      console.log("Error verifying OTP", error);
      Alert.alert("Error", "Something went wrong");
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

            {otpsend && (
              <Text style={styles.otpText}>OTP: {otpsend}</Text>
            )}

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
