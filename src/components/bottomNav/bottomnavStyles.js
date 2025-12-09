import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 6,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    overflow: 'hidden',
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
