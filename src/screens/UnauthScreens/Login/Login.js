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
  Modal,
  FlatList,
} from 'react-native';
import React, { useState, useRef } from 'react';
import styles from './LoginStyle';
import { LoginAPI } from '../../../API/unauthAPI/unauthAPI';
import ScreenWrapper from '../../../components/safeAreaViewWrapper/ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { login } from '../../../redux/slices/authSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { setUserId, setUser } from '../../../redux/slices/authSlice';

// Complete world country codes data (195+ countries)
const COUNTRY_CODES = [
  // Asia
  {
    code: '+93',
    country: 'Afghanistan',
    flag: '🇦🇫',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+374', country: 'Armenia', flag: '🇦🇲', minLength: 8, maxLength: 8 },
  {
    code: '+994',
    country: 'Azerbaijan',
    flag: '🇦🇿',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭', minLength: 8, maxLength: 8 },
  {
    code: '+880',
    country: 'Bangladesh',
    flag: '🇧🇩',
    minLength: 10,
    maxLength: 10,
  },
  { code: '+975', country: 'Bhutan', flag: '🇧🇹', minLength: 8, maxLength: 8 },
  { code: '+673', country: 'Brunei', flag: '🇧🇳', minLength: 7, maxLength: 7 },
  { code: '+855', country: 'Cambodia', flag: '🇰🇭', minLength: 8, maxLength: 9 },
  { code: '+86', country: 'China', flag: '🇨🇳', minLength: 11, maxLength: 11 },
  { code: '+995', country: 'Georgia', flag: '🇬🇪', minLength: 9, maxLength: 9 },
  {
    code: '+852',
    country: 'Hong Kong',
    flag: '🇭🇰',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+91', country: 'India', flag: '🇮🇳', minLength: 10, maxLength: 10 },
  {
    code: '+62',
    country: 'Indonesia',
    flag: '🇮🇩',
    minLength: 10,
    maxLength: 13,
  },
  { code: '+98', country: 'Iran', flag: '🇮🇷', minLength: 10, maxLength: 10 },
  { code: '+964', country: 'Iraq', flag: '🇮🇶', minLength: 10, maxLength: 10 },
  { code: '+972', country: 'Israel', flag: '🇮🇱', minLength: 9, maxLength: 9 },
  { code: '+81', country: 'Japan', flag: '🇯🇵', minLength: 10, maxLength: 10 },
  { code: '+962', country: 'Jordan', flag: '🇯🇴', minLength: 9, maxLength: 9 },
  {
    code: '+7',
    country: 'Kazakhstan',
    flag: '🇰🇿',
    minLength: 10,
    maxLength: 10,
  },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼', minLength: 8, maxLength: 8 },
  {
    code: '+996',
    country: 'Kyrgyzstan',
    flag: '🇰🇬',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+856', country: 'Laos', flag: '🇱🇦', minLength: 9, maxLength: 10 },
  { code: '+961', country: 'Lebanon', flag: '🇱🇧', minLength: 7, maxLength: 8 },
  { code: '+853', country: 'Macau', flag: '🇲🇴', minLength: 8, maxLength: 8 },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾', minLength: 9, maxLength: 10 },
  { code: '+960', country: 'Maldives', flag: '🇲🇻', minLength: 7, maxLength: 7 },
  { code: '+976', country: 'Mongolia', flag: '🇲🇳', minLength: 8, maxLength: 8 },
  { code: '+95', country: 'Myanmar', flag: '🇲🇲', minLength: 9, maxLength: 10 },
  { code: '+977', country: 'Nepal', flag: '🇳🇵', minLength: 10, maxLength: 10 },
  {
    code: '+850',
    country: 'North Korea',
    flag: '🇰🇵',
    minLength: 10,
    maxLength: 10,
  },
  { code: '+968', country: 'Oman', flag: '🇴🇲', minLength: 8, maxLength: 8 },
  {
    code: '+92',
    country: 'Pakistan',
    flag: '🇵🇰',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+970',
    country: 'Palestine',
    flag: '🇵🇸',
    minLength: 9,
    maxLength: 9,
  },
  {
    code: '+63',
    country: 'Philippines',
    flag: '🇵🇭',
    minLength: 10,
    maxLength: 10,
  },
  { code: '+974', country: 'Qatar', flag: '🇶🇦', minLength: 8, maxLength: 8 },
  {
    code: '+966',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', minLength: 8, maxLength: 8 },
  {
    code: '+82',
    country: 'South Korea',
    flag: '🇰🇷',
    minLength: 10,
    maxLength: 11,
  },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰', minLength: 9, maxLength: 9 },
  { code: '+963', country: 'Syria', flag: '🇸🇾', minLength: 9, maxLength: 9 },
  { code: '+886', country: 'Taiwan', flag: '🇹🇼', minLength: 9, maxLength: 9 },
  {
    code: '+992',
    country: 'Tajikistan',
    flag: '🇹🇯',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+66', country: 'Thailand', flag: '🇹🇭', minLength: 9, maxLength: 9 },
  {
    code: '+670',
    country: 'Timor-Leste',
    flag: '🇹🇱',
    minLength: 7,
    maxLength: 8,
  },
  { code: '+90', country: 'Turkey', flag: '🇹🇷', minLength: 10, maxLength: 10 },
  {
    code: '+993',
    country: 'Turkmenistan',
    flag: '🇹🇲',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+971', country: 'UAE', flag: '🇦🇪', minLength: 9, maxLength: 9 },
  {
    code: '+998',
    country: 'Uzbekistan',
    flag: '🇺🇿',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳', minLength: 9, maxLength: 10 },
  { code: '+967', country: 'Yemen', flag: '🇾🇪', minLength: 9, maxLength: 9 },

  // Europe
  { code: '+355', country: 'Albania', flag: '🇦🇱', minLength: 9, maxLength: 9 },
  { code: '+376', country: 'Andorra', flag: '🇦🇩', minLength: 6, maxLength: 9 },
  { code: '+43', country: 'Austria', flag: '🇦🇹', minLength: 10, maxLength: 11 },
  { code: '+375', country: 'Belarus', flag: '🇧🇾', minLength: 9, maxLength: 9 },
  { code: '+32', country: 'Belgium', flag: '🇧🇪', minLength: 9, maxLength: 9 },
  {
    code: '+387',
    country: 'Bosnia and Herzegovina',
    flag: '🇧🇦',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+359', country: 'Bulgaria', flag: '🇧🇬', minLength: 9, maxLength: 9 },
  { code: '+385', country: 'Croatia', flag: '🇭🇷', minLength: 9, maxLength: 9 },
  { code: '+357', country: 'Cyprus', flag: '🇨🇾', minLength: 8, maxLength: 8 },
  {
    code: '+420',
    country: 'Czech Republic',
    flag: '🇨🇿',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+45', country: 'Denmark', flag: '🇩🇰', minLength: 8, maxLength: 8 },
  { code: '+372', country: 'Estonia', flag: '🇪🇪', minLength: 7, maxLength: 8 },
  { code: '+358', country: 'Finland', flag: '🇫🇮', minLength: 9, maxLength: 10 },
  { code: '+33', country: 'France', flag: '🇫🇷', minLength: 9, maxLength: 9 },
  { code: '+49', country: 'Germany', flag: '🇩🇪', minLength: 10, maxLength: 11 },
  {
    code: '+350',
    country: 'Gibraltar',
    flag: '🇬🇮',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+30', country: 'Greece', flag: '🇬🇷', minLength: 10, maxLength: 10 },
  { code: '+36', country: 'Hungary', flag: '🇭🇺', minLength: 9, maxLength: 9 },
  { code: '+354', country: 'Iceland', flag: '🇮🇸', minLength: 7, maxLength: 7 },
  { code: '+353', country: 'Ireland', flag: '🇮🇪', minLength: 9, maxLength: 9 },
  { code: '+39', country: 'Italy', flag: '🇮🇹', minLength: 9, maxLength: 10 },
  { code: '+383', country: 'Kosovo', flag: '🇽🇰', minLength: 8, maxLength: 9 },
  { code: '+371', country: 'Latvia', flag: '🇱🇻', minLength: 8, maxLength: 8 },
  {
    code: '+423',
    country: 'Liechtenstein',
    flag: '🇱🇮',
    minLength: 7,
    maxLength: 7,
  },
  {
    code: '+370',
    country: 'Lithuania',
    flag: '🇱🇹',
    minLength: 8,
    maxLength: 8,
  },
  {
    code: '+352',
    country: 'Luxembourg',
    flag: '🇱🇺',
    minLength: 9,
    maxLength: 9,
  },
  {
    code: '+389',
    country: 'North Macedonia',
    flag: '🇲🇰',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+356', country: 'Malta', flag: '🇲🇹', minLength: 8, maxLength: 8 },
  { code: '+373', country: 'Moldova', flag: '🇲🇩', minLength: 8, maxLength: 8 },
  { code: '+377', country: 'Monaco', flag: '🇲🇨', minLength: 8, maxLength: 9 },
  {
    code: '+382',
    country: 'Montenegro',
    flag: '🇲🇪',
    minLength: 8,
    maxLength: 8,
  },
  {
    code: '+31',
    country: 'Netherlands',
    flag: '🇳🇱',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+47', country: 'Norway', flag: '🇳🇴', minLength: 8, maxLength: 8 },
  { code: '+48', country: 'Poland', flag: '🇵🇱', minLength: 9, maxLength: 9 },
  { code: '+351', country: 'Portugal', flag: '🇵🇹', minLength: 9, maxLength: 9 },
  { code: '+40', country: 'Romania', flag: '🇷🇴', minLength: 9, maxLength: 9 },
  { code: '+7', country: 'Russia', flag: '🇷🇺', minLength: 10, maxLength: 10 },
  {
    code: '+378',
    country: 'San Marino',
    flag: '🇸🇲',
    minLength: 10,
    maxLength: 10,
  },
  { code: '+381', country: 'Serbia', flag: '🇷🇸', minLength: 9, maxLength: 9 },
  { code: '+421', country: 'Slovakia', flag: '🇸🇰', minLength: 9, maxLength: 9 },
  { code: '+386', country: 'Slovenia', flag: '🇸🇮', minLength: 9, maxLength: 9 },
  { code: '+34', country: 'Spain', flag: '🇪🇸', minLength: 9, maxLength: 9 },
  { code: '+46', country: 'Sweden', flag: '🇸🇪', minLength: 9, maxLength: 9 },
  {
    code: '+41',
    country: 'Switzerland',
    flag: '🇨🇭',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+380', country: 'Ukraine', flag: '🇺🇦', minLength: 9, maxLength: 9 },
  {
    code: '+44',
    country: 'United Kingdom',
    flag: '🇬🇧',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+379',
    country: 'Vatican City',
    flag: '🇻🇦',
    minLength: 10,
    maxLength: 10,
  },

  // Africa
  { code: '+213', country: 'Algeria', flag: '🇩🇿', minLength: 9, maxLength: 9 },
  { code: '+244', country: 'Angola', flag: '🇦🇴', minLength: 9, maxLength: 9 },
  { code: '+229', country: 'Benin', flag: '🇧🇯', minLength: 8, maxLength: 8 },
  { code: '+267', country: 'Botswana', flag: '🇧🇼', minLength: 7, maxLength: 8 },
  {
    code: '+226',
    country: 'Burkina Faso',
    flag: '🇧🇫',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+257', country: 'Burundi', flag: '🇧🇮', minLength: 8, maxLength: 8 },
  { code: '+237', country: 'Cameroon', flag: '🇨🇲', minLength: 9, maxLength: 9 },
  {
    code: '+238',
    country: 'Cape Verde',
    flag: '🇨🇻',
    minLength: 7,
    maxLength: 7,
  },
  {
    code: '+236',
    country: 'Central African Republic',
    flag: '🇨🇫',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+235', country: 'Chad', flag: '🇹🇩', minLength: 8, maxLength: 8 },
  { code: '+269', country: 'Comoros', flag: '🇰🇲', minLength: 7, maxLength: 7 },
  { code: '+242', country: 'Congo', flag: '🇨🇬', minLength: 9, maxLength: 9 },
  { code: '+243', country: 'DR Congo', flag: '🇨🇩', minLength: 9, maxLength: 9 },
  { code: '+253', country: 'Djibouti', flag: '🇩🇯', minLength: 8, maxLength: 8 },
  { code: '+20', country: 'Egypt', flag: '🇪🇬', minLength: 10, maxLength: 10 },
  {
    code: '+240',
    country: 'Equatorial Guinea',
    flag: '🇬🇶',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+291', country: 'Eritrea', flag: '🇪🇷', minLength: 7, maxLength: 7 },
  { code: '+268', country: 'Eswatini', flag: '🇸🇿', minLength: 8, maxLength: 8 },
  { code: '+251', country: 'Ethiopia', flag: '🇪🇹', minLength: 9, maxLength: 9 },
  { code: '+241', country: 'Gabon', flag: '🇬🇦', minLength: 7, maxLength: 8 },
  { code: '+220', country: 'Gambia', flag: '🇬🇲', minLength: 7, maxLength: 7 },
  { code: '+233', country: 'Ghana', flag: '🇬🇭', minLength: 9, maxLength: 9 },
  { code: '+224', country: 'Guinea', flag: '🇬🇳', minLength: 9, maxLength: 9 },
  {
    code: '+245',
    country: 'Guinea-Bissau',
    flag: '🇬🇼',
    minLength: 7,
    maxLength: 7,
  },
  {
    code: '+225',
    country: 'Ivory Coast',
    flag: '🇨🇮',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+254', country: 'Kenya', flag: '🇰🇪', minLength: 9, maxLength: 10 },
  { code: '+266', country: 'Lesotho', flag: '🇱🇸', minLength: 8, maxLength: 8 },
  { code: '+231', country: 'Liberia', flag: '🇱🇷', minLength: 7, maxLength: 8 },
  { code: '+218', country: 'Libya', flag: '🇱🇾', minLength: 9, maxLength: 10 },
  {
    code: '+261',
    country: 'Madagascar',
    flag: '🇲🇬',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+265', country: 'Malawi', flag: '🇲🇼', minLength: 9, maxLength: 9 },
  { code: '+223', country: 'Mali', flag: '🇲🇱', minLength: 8, maxLength: 8 },
  {
    code: '+222',
    country: 'Mauritania',
    flag: '🇲🇷',
    minLength: 8,
    maxLength: 8,
  },
  {
    code: '+230',
    country: 'Mauritius',
    flag: '🇲🇺',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+212', country: 'Morocco', flag: '🇲🇦', minLength: 9, maxLength: 9 },
  {
    code: '+258',
    country: 'Mozambique',
    flag: '🇲🇿',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+264', country: 'Namibia', flag: '🇳🇦', minLength: 9, maxLength: 10 },
  { code: '+227', country: 'Niger', flag: '🇳🇪', minLength: 8, maxLength: 8 },
  {
    code: '+234',
    country: 'Nigeria',
    flag: '🇳🇬',
    minLength: 10,
    maxLength: 10,
  },
  { code: '+250', country: 'Rwanda', flag: '🇷🇼', minLength: 9, maxLength: 9 },
  {
    code: '+239',
    country: 'Sao Tome and Principe',
    flag: '🇸🇹',
    minLength: 7,
    maxLength: 7,
  },
  { code: '+221', country: 'Senegal', flag: '🇸🇳', minLength: 9, maxLength: 9 },
  {
    code: '+248',
    country: 'Seychelles',
    flag: '🇸🇨',
    minLength: 7,
    maxLength: 7,
  },
  {
    code: '+232',
    country: 'Sierra Leone',
    flag: '🇸🇱',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+252', country: 'Somalia', flag: '🇸🇴', minLength: 8, maxLength: 9 },
  {
    code: '+27',
    country: 'South Africa',
    flag: '🇿🇦',
    minLength: 9,
    maxLength: 9,
  },
  {
    code: '+211',
    country: 'South Sudan',
    flag: '🇸🇸',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+249', country: 'Sudan', flag: '🇸🇩', minLength: 9, maxLength: 9 },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿', minLength: 9, maxLength: 9 },
  { code: '+228', country: 'Togo', flag: '🇹🇬', minLength: 8, maxLength: 8 },
  { code: '+216', country: 'Tunisia', flag: '🇹🇳', minLength: 8, maxLength: 8 },
  { code: '+256', country: 'Uganda', flag: '🇺🇬', minLength: 9, maxLength: 9 },
  { code: '+260', country: 'Zambia', flag: '🇿🇲', minLength: 9, maxLength: 9 },
  { code: '+263', country: 'Zimbabwe', flag: '🇿🇼', minLength: 9, maxLength: 9 },

  // North America
  { code: '+1', country: 'Canada', flag: '🇨🇦', minLength: 10, maxLength: 10 },
  { code: '+52', country: 'Mexico', flag: '🇲🇽', minLength: 10, maxLength: 10 },
  {
    code: '+1',
    country: 'United States',
    flag: '🇺🇸',
    minLength: 10,
    maxLength: 10,
  },

  // Central America
  { code: '+501', country: 'Belize', flag: '🇧🇿', minLength: 7, maxLength: 7 },
  {
    code: '+506',
    country: 'Costa Rica',
    flag: '🇨🇷',
    minLength: 8,
    maxLength: 8,
  },
  {
    code: '+503',
    country: 'El Salvador',
    flag: '🇸🇻',
    minLength: 8,
    maxLength: 8,
  },
  {
    code: '+502',
    country: 'Guatemala',
    flag: '🇬🇹',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+504', country: 'Honduras', flag: '🇭🇳', minLength: 8, maxLength: 8 },
  {
    code: '+505',
    country: 'Nicaragua',
    flag: '🇳🇮',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+507', country: 'Panama', flag: '🇵🇦', minLength: 8, maxLength: 8 },

  // Caribbean
  {
    code: '+1268',
    country: 'Antigua and Barbuda',
    flag: '🇦🇬',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1242',
    country: 'Bahamas',
    flag: '🇧🇸',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1246',
    country: 'Barbados',
    flag: '🇧🇧',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1441',
    country: 'Bermuda',
    flag: '🇧🇲',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1345',
    country: 'Cayman Islands',
    flag: '🇰🇾',
    minLength: 10,
    maxLength: 10,
  },
  { code: '+53', country: 'Cuba', flag: '🇨🇺', minLength: 8, maxLength: 8 },
  {
    code: '+1767',
    country: 'Dominica',
    flag: '🇩🇲',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1809',
    country: 'Dominican Republic',
    flag: '🇩🇴',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1473',
    country: 'Grenada',
    flag: '🇬🇩',
    minLength: 10,
    maxLength: 10,
  },
  { code: '+509', country: 'Haiti', flag: '🇭🇹', minLength: 8, maxLength: 8 },
  {
    code: '+1876',
    country: 'Jamaica',
    flag: '🇯🇲',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1664',
    country: 'Montserrat',
    flag: '🇲🇸',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1787',
    country: 'Puerto Rico',
    flag: '🇵🇷',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1869',
    country: 'Saint Kitts and Nevis',
    flag: '🇰🇳',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1758',
    country: 'Saint Lucia',
    flag: '🇱🇨',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1784',
    country: 'Saint Vincent',
    flag: '🇻🇨',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1868',
    country: 'Trinidad and Tobago',
    flag: '🇹🇹',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: '+1649',
    country: 'Turks and Caicos',
    flag: '🇹🇨',
    minLength: 10,
    maxLength: 10,
  },

  // South America
  {
    code: '+54',
    country: 'Argentina',
    flag: '🇦🇷',
    minLength: 10,
    maxLength: 10,
  },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴', minLength: 8, maxLength: 8 },
  { code: '+55', country: 'Brazil', flag: '🇧🇷', minLength: 10, maxLength: 11 },
  { code: '+56', country: 'Chile', flag: '🇨🇱', minLength: 9, maxLength: 9 },
  {
    code: '+57',
    country: 'Colombia',
    flag: '🇨🇴',
    minLength: 10,
    maxLength: 10,
  },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨', minLength: 9, maxLength: 9 },
  {
    code: '+594',
    country: 'French Guiana',
    flag: '🇬🇫',
    minLength: 9,
    maxLength: 9,
  },
  { code: '+592', country: 'Guyana', flag: '🇬🇾', minLength: 7, maxLength: 7 },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾', minLength: 9, maxLength: 9 },
  { code: '+51', country: 'Peru', flag: '🇵🇪', minLength: 9, maxLength: 9 },
  { code: '+597', country: 'Suriname', flag: '🇸🇷', minLength: 7, maxLength: 7 },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾', minLength: 8, maxLength: 8 },
  {
    code: '+58',
    country: 'Venezuela',
    flag: '🇻🇪',
    minLength: 10,
    maxLength: 10,
  },

  // Oceania
  { code: '+61', country: 'Australia', flag: '🇦🇺', minLength: 9, maxLength: 9 },
  { code: '+679', country: 'Fiji', flag: '🇫🇯', minLength: 7, maxLength: 7 },
  { code: '+686', country: 'Kiribati', flag: '🇰🇮', minLength: 8, maxLength: 8 },
  {
    code: '+692',
    country: 'Marshall Islands',
    flag: '🇲🇭',
    minLength: 7,
    maxLength: 7,
  },
  {
    code: '+691',
    country: 'Micronesia',
    flag: '🇫🇲',
    minLength: 7,
    maxLength: 7,
  },
  { code: '+674', country: 'Nauru', flag: '🇳🇷', minLength: 7, maxLength: 7 },
  {
    code: '+64',
    country: 'New Zealand',
    flag: '🇳🇿',
    minLength: 9,
    maxLength: 10,
  },
  { code: '+680', country: 'Palau', flag: '🇵🇼', minLength: 7, maxLength: 7 },
  {
    code: '+675',
    country: 'Papua New Guinea',
    flag: '🇵🇬',
    minLength: 8,
    maxLength: 8,
  },
  { code: '+685', country: 'Samoa', flag: '🇼🇸', minLength: 7, maxLength: 7 },
  {
    code: '+677',
    country: 'Solomon Islands',
    flag: '🇸🇧',
    minLength: 7,
    maxLength: 7,
  },
  { code: '+676', country: 'Tonga', flag: '🇹🇴', minLength: 7, maxLength: 7 },
  { code: '+688', country: 'Tuvalu', flag: '🇹🇻', minLength: 6, maxLength: 6 },
  { code: '+678', country: 'Vanuatu', flag: '🇻🇺', minLength: 7, maxLength: 7 },
];

const Login = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    COUNTRY_CODES[35],
  ); // Default to Saudi Arabia
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const phoneInputRef = useRef(null);
  const dispatch = useDispatch();

  // Filter countries based on search
  const filteredCountries = COUNTRY_CODES.filter(
    country =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery),
  );

  // Format phone number with spaces for better readability
  const formatPhoneNumber = text => {
    const numbers = text.replace(/[^0-9]/g, '');

    // Format based on country
    if (
      selectedCountryCode.code === '+91' ||
      selectedCountryCode.code === '+1'
    ) {
      // Format: XXX XXX XXXX
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6)
        return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(
        6,
        10,
      )}`;
    } else if (
      selectedCountryCode.code === '+966' ||
      selectedCountryCode.code === '+971'
    ) {
      // Format: XX XXX XXXX
      if (numbers.length <= 2) return numbers;
      if (numbers.length <= 5)
        return `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
      return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(
        5,
        9,
      )}`;
    }

    // Default formatting for other countries
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;
  };

  const handlePhoneChange = text => {
    const numbers = text.replace(/[^0-9]/g, '');
    const maxLength = selectedCountryCode.maxLength || 15;

    if (numbers.length <= maxLength) {
      setMobileNumber(formatPhoneNumber(numbers));
    }
  };

  const getCleanPhoneNumber = () => {
    return mobileNumber.replace(/\s/g, '');
  };

  const isValidPhoneNumber = () => {
    const cleanNumber = getCleanPhoneNumber();
    const minLength = selectedCountryCode.minLength || 8;
    const maxLength = selectedCountryCode.maxLength || 15;
    return cleanNumber.length >= minLength && cleanNumber.length <= maxLength;
  };

  const handleGetOTP = async () => {
    const cleanNumber = getCleanPhoneNumber();
    console.log('📞 Entered Phone =>', selectedCountryCode.code + cleanNumber);

    if (!cleanNumber.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (!isValidPhoneNumber()) {
      const minLength = selectedCountryCode.minLength || 8;
      Alert.alert(
        'Error',
        `Please enter a valid ${selectedCountryCode.country} mobile number (${minLength} digits)`,
      );
      return;
    }

    setIsLoading(true);

    try {
      const fullPhone = selectedCountryCode.code + cleanNumber;
      const response = await LoginAPI({ phone: cleanNumber });

      console.log('📦 API Raw Response =>', response?.data);

      const userId = response?.data?.id;
      const otp = response?.data?.otp;

      console.log('🆔 Extracted userId =>', userId);
      console.log('🔐 OTP Received =>', otp);

      await AsyncStorage.setItem('userId', String(userId));

      console.log('📍 Saved to AsyncStorage =>', String(userId));

      dispatch(setUserId(userId));
      dispatch(setUser({ phone: cleanNumber, id: userId }));

      console.log('🟢 Redux Updated =>', {
        userId,
        user: { phone: fullPhone, id: userId },
      });

      setIsLoading(false);

      if (otp) {
        navigation.navigate('OtpScreen', {
          otpsend: otp,
          phone: cleanNumber,
        });
      }

      Alert.alert('Success', `OTP sent to ${fullPhone}`);
    } catch (error) {
      console.log('❌ Error occurred while login =>', error);
      setIsLoading(false);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  const selectCountryCode = item => {
    setSelectedCountryCode(item);
    setModalVisible(false);
    setSearchQuery('');
    setMobileNumber(''); // Clear input when changing country
    // Auto-focus the input after selecting country
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 300);
  };

  const getPlaceholder = () => {
    if (
      selectedCountryCode.code === '+91' ||
      selectedCountryCode.code === '+1'
    ) {
      return 'XXX XXX XXXX';
    } else if (
      selectedCountryCode.code === '+966' ||
      selectedCountryCode.code === '+971'
    ) {
      return 'XX XXX XXXX';
    }
    return 'Enter mobile number';
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
              <Text style={styles.inputLabel}>Mobile Number</Text>

              <View
                style={[
                  styles.phoneInputContainer,
                  isFocused && styles.phoneInputContainerFocused,
                  !isValidPhoneNumber() &&
                    getCleanPhoneNumber().length > 0 &&
                    styles.phoneInputContainerError,
                ]}
              >
                {/* Country Code Dropdown */}
                <TouchableOpacity
                  style={styles.countryCodeButton}
                  onPress={() => setModalVisible(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.countryFlag}>
                    {selectedCountryCode.flag}
                  </Text>
                  <Text style={styles.countryCode}>
                    {selectedCountryCode.code}
                  </Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>

                <View style={styles.separator} />

                <TextInput
                  ref={phoneInputRef}
                  style={styles.phoneInput}
                  placeholder={getPlaceholder()}
                  placeholderTextColor="#AAA"
                  cursorColor={'#8B4513'}
                  value={mobileNumber}
                  onChangeText={handlePhoneChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  keyboardType="number-pad"
                  inputMode="numeric"
                  returnKeyType="done"
                  onSubmitEditing={handleGetOTP}
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                />

                {/* Clear button */}
                {mobileNumber.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => setMobileNumber('')}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.clearButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Helper text */}
              {getCleanPhoneNumber().length > 0 && (
                <Text
                  style={[
                    styles.helperText,
                    isValidPhoneNumber()
                      ? styles.helperTextSuccess
                      : styles.helperTextError,
                  ]}
                >
                  {isValidPhoneNumber()
                    ? `✓ Valid ${selectedCountryCode.country} number`
                    : `Enter ${selectedCountryCode.minLength || 8} digits for ${
                        selectedCountryCode.country
                      }`}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.otpButton,
                (isLoading || !isValidPhoneNumber()) &&
                  styles.otpButtonDisabled,
              ]}
              onPress={handleGetOTP}
              disabled={isLoading || !isValidPhoneNumber()}
              activeOpacity={0.8}
            >
              <Text style={styles.otpButtonText}>
                {isLoading ? 'Sending OTP...' : 'Get OTP'}
              </Text>
            </TouchableOpacity>

            {/* Additional help text */}
            <Text style={styles.privacyText}>
              We'll send you a one-time password to verify your number
            </Text>
          </View>
        </ScrollView>

        {/* Country Code Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setSearchQuery('');
          }}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => {
              setModalVisible(false);
              setSearchQuery('');
            }}
          >
            <View
              style={styles.modalContent}
              onStartShouldSetResponder={() => true}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Select Country ({COUNTRY_CODES.length})
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setSearchQuery('');
                  }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#95A5A6" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search country or code..."
                  placeholderTextColor="#95A5A6"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    style={styles.searchClearButton}
                    onPress={() => setSearchQuery('')}
                  >
                    <Text style={styles.clearButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
              <FlatList
                data={filteredCountries}
                keyExtractor={(item, index) =>
                  `${item.code}-${item.country}-${index}`
                }
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.countryItem,
                      selectedCountryCode.code === item.code &&
                        selectedCountryCode.country === item.country &&
                        styles.selectedCountryItem,
                    ]}
                    onPress={() => selectCountryCode(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.countryItemFlag}>{item.flag}</Text>
                    <View style={styles.countryItemTextContainer}>
                      <Text style={styles.countryItemName}>{item.country}</Text>
                      <Text style={styles.countryItemCode}>{item.code}</Text>
                    </View>
                    {selectedCountryCode.code === item.code &&
                      selectedCountryCode.country === item.country && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>🌍</Text>
                    <Text style={styles.emptyText}>No countries found</Text>
                    <Text style={styles.emptySubtext}>
                      Try a different search term
                    </Text>
                  </View>
                }
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Login;
