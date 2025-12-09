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
import styles from './LoginStyle'; // Import styles
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
  console.log("📞 Entered Phone =>", mobileNumber);

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
    const response = await LoginAPI({ phone: `91${mobileNumber}` });

    console.log("📦 API Raw Response =>", response?.data);

    const userId = response?.data?.id;
    const otp = response?.data?.otp;

    console.log("🆔 Extracted userId =>", userId);
    console.log("🔐 OTP Received =>", otp);

    // Save userId in AsyncStorage
    await AsyncStorage.setItem("userId", userId);
    console.log("📍 Saved to AsyncStorage =>", userId);

    // Redux Update
    dispatch(setUserId(userId));
    dispatch(setUser({ phone: `91${mobileNumber}`, id: userId }));

    console.log("🟢 Redux Updated =>", {
      userId,
      user: { phone: `91${mobileNumber}`, id: userId },
    });

    setIsLoading(false);

    if (otp) {
      console.log("➡ Navigating to OTP Screen...");
      navigation.navigate("OtpScreen", {
        otpsend: otp,
        phone: `91${mobileNumber}`,
      });
    }

    Alert.alert("Success", `OTP sent to +91${mobileNumber}`);
  } catch (error) {
    console.log("❌ Error occurred while login =>", error);
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

return (
  <ScreenWrapper>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          {
            paddingTop: Platform.OS === "android" ? hp(2) : hp(1),
            paddingBottom: hp(2),
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Mobile number"
                placeholderTextColor="#999"
                cursorColor={'#8B4513'}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>

            <TouchableOpacity
              style={styles.lostNumberButton}
              onPress={handleLostNumber}
            >
              <Text style={styles.lostNumberText}>Lost Number?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.otpButton, isLoading && styles.otpButtonDisabled]}
            onPress={handleGetOTP}
            disabled={isLoading}
          >
            <Text style={styles.otpButtonText}>
              {isLoading ? "Sending..." : "Get OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </ScreenWrapper>
);

};

export default Login;
