import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import styles from './LoginStyle';
import { LoginAPI } from '../../../API/unauthAPI/unauthAPI';
import ScreenWrapper from '../../../components/safeAreaViewWrapper/ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/authSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { setUserId, setUser } from '../../../redux/slices/authSlice';

const Login = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleGetOTP = async () => {
    console.log('📞 Entered Phone =>', mobileNumber);

    if (!mobileNumber.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);

    try {
      const response = await LoginAPI({ phone: mobileNumber });

      console.log('📦 API Raw Response =>', response?.data);

      const userId = response?.data?.id;
      const otp = response?.data?.otp;

      console.log('🆔 Extracted userId =>', userId);
      console.log('🔐 OTP Received =>', otp);

      // ✅ FIX: AsyncStorage requires STRING
      await AsyncStorage.setItem('userId', String(userId));

      console.log('📍 Saved to AsyncStorage =>', String(userId));

      dispatch(setUserId(userId));
      dispatch(setUser({ phone: mobileNumber, id: userId }));

      console.log('🟢 Redux Updated =>', {
        userId,
        user: { phone: mobileNumber, id: userId },
      });

      setIsLoading(false);

      if (otp) {
        navigation.navigate('OtpScreen', {
          otpsend: otp,
          phone: mobileNumber,
        });
      }

      Alert.alert('Success', `OTP sent to ${mobileNumber}`);
    } catch (error) {
      console.log('❌ Error occurred while login =>', error);
      setIsLoading(false);
    }
  };

  const handleLostNumber = () => {
    navigation.navigate('RegisteredEmail');
    Alert.alert(
      'Lost Number?',
      'Please contact our support team for assistance.',
    );
  };

  const formatPhone = value => {
    const digits = value.replace(/\D/g, '').slice(0, 10);

    let result = '';
    if (digits.length > 0) result += digits.slice(0, 3);
    if (digits.length > 3) result += ' ' + digits.slice(3, 6);
    if (digits.length > 6) result += ' ' + digits.slice(6, 10);

    return result;
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.header}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

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

            <View style={styles.inputContainer}>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.countryCode}></Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Mobile number"
                  placeholderTextColor="#999"
                  cursorColor={'#8B4513'}
                  value={mobileNumber}
                  onChangeText={text => {
                    // 🔥 ONLY NUMBERS ALLOWED
                    const numericText = text.replace(/[^0-9]/g, '');
                    setMobileNumber(numericText);
                  }}
                  keyboardType="number-pad"
                  maxLength={15}
                  inputMode="numeric" // ✅ Android + iOS (new)
                  returnKeyType="done"
                />
              </View>

              {/* <TouchableOpacity
                style={styles.lostNumberButton}
                onPress={handleLostNumber}
              >
                <Text style={styles.lostNumberText}>Lost Number?</Text>
              </TouchableOpacity> */}
            </View>

            <TouchableOpacity
              style={[styles.otpButton, isLoading && styles.otpButtonDisabled]}
              onPress={handleGetOTP}
              disabled={isLoading}
            >
              <Text style={styles.otpButtonText}>
                {isLoading ? 'Sending...' : 'Get OTP'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Login;
