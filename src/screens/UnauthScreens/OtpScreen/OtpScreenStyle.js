import { StyleSheet, Platform, StatusBar } from 'react-native';
import { wp, hp } from '../../../utils/Functions/Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp(2),
  },
  mainContent: {
    paddingHorizontal: wp(6),
    alignItems: 'center',
  },

  illustrationContainer: {
    marginTop: hp(4),
    marginBottom: hp(3),
    width: '100%',
    alignItems: 'center',
  },

  illustration: {
    width: wp(85),
    height: hp(32),
  },

  textContainer: {
    width: '100%',
    marginBottom: hp(2),
  },

  title: {
    fontSize: wp(5.4),
    fontWeight: '700',
    color: '#8B4513',
    lineHeight: wp(4),
  },

  subtitle: {
    fontSize: wp(4.4),
    fontWeight: '600',
    color: '#8B4513',
    marginTop: hp(0.1),
  },

  dotsContainer: {
    flexDirection: 'row',
    gap: wp(2),
    marginTop: hp(2),
    marginBottom: hp(2),
  },

  otpText: {
    fontSize: wp(4),
    fontWeight: '400',
    color: 'green',
    marginBottom: hp(0.4),
  },

  loginButton: {
    width: '83%',
    backgroundColor: '#8B4513',
    paddingVertical: hp(1.8),
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: Platform.OS === 'ios' ? hp(3) : hp(2),

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  loginButtonText: {
    fontSize: wp(4.3),
    color: '#fff',
    fontWeight: '700',
  },
});

export default styles;
