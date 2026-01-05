import { StyleSheet, Platform } from 'react-native';
import { wp, hp } from '../../../utils/Functions/Responsive';

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: hp(4),
  },

  header: {
    paddingTop: hp(2),
    paddingHorizontal: wp(5),
    paddingBottom: hp(1),
  },

  logo: {
    width: wp(38),
    height: hp(4.5),
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
  },

  illustrationContainer: {
    alignItems: 'center',
    marginBottom: hp(2.5),
  },

  illustration: {
    width: wp(78),
    height: wp(58),
  },

  textContainer: {
    marginBottom: hp(2.5),
  },

  title: {
    fontSize: wp(6),
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: '#8B4513',
    lineHeight: wp(8),
    marginBottom: hp(0.8),
  },

  subtitle: {
    fontSize: wp(4.4),
    color: '#8B4513',
    lineHeight: wp(6),
    opacity: 0.85,
  },

  inputContainer: {
    marginTop: hp(1),
    marginBottom: hp(2.5),
  },

phoneInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#D6B08C', // softer brown
  borderRadius: wp(3.5),
  backgroundColor: '#FFF7F0', // 🔥 FILLED FEEL
  paddingHorizontal: wp(4),
  height: hp(6.2), // 🔥 smaller height (important)
  marginBottom: hp(1.8),

  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    },
    android: {
      elevation: 2,
    },
  }),
},

phoneInput: {
  flex: 1,
  fontSize: wp(5.2),        // 🔥 thoda bada
  color: '#222',
  fontWeight: '600',

  letterSpacing: wp(1.6),  // 🔥 MOST IMPORTANT (text spread)
  paddingVertical: 0,
  textAlignVertical: 'center',
},


  otpButton: {
    backgroundColor: '#8B4513',
    paddingVertical: hp(2),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
    marginBottom: hp(2),
    ...Platform.select({
      ios: {
        shadowColor: '#8B4513',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  otpButtonDisabled: {
    backgroundColor: '#B0B0B0',
    elevation: 1,
  },

  otpButtonText: {
    color: '#FFF',
    fontSize: wp(4.6),
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});

export default styles;
