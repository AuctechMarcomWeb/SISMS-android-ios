import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import NormalHeader from '../../../../../components/NormalHeader/NormalHeader';
import { wp, hp } from '../../../../../utils/Functions/Responsive';
import Layout from '../../../../../components/layout/layout';

const { width } = Dimensions.get('window');

const WalletScreen = () => {
  const [selectedCard, setSelectedCard] = useState('wallet');

  const handleWalletPress = () => {
    setSelectedCard('wallet');
    console.log('Wallet pressed');
    // Add your navigation or action here
  };

  const handleTransactionsPress = () => {
    setSelectedCard('transactions');
    console.log('Transactions pressed');
    // Add your navigation or action here
  };

  const handleUsagePress = () => {
    setSelectedCard('usage');
    console.log('Usage pressed');
    // Add your navigation or action here
  };

  const handleAddCreditPress = () => {
    console.log('Add Credit pressed');
    // Add your add credit logic here
  };

  return (
    <Layout>
      <View style={styles.container}>
        <NormalHeader title={'WALLET'} />

        {/* Main Content */}
        <View style={styles.content}>
          {/* Menu Cards */}
          <View style={styles.menuContainer}>
            {/* Wallet Card */}
            <TouchableOpacity
              style={[
                styles.menuCard,
                selectedCard === 'wallet' && styles.activeCard,
              ]}
              onPress={handleWalletPress}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../../../../assets/images/wallet_icon.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.menuText}>WALLET</Text>
            </TouchableOpacity>

            {/* Transactions Card */}
            <TouchableOpacity
              style={[
                styles.menuCard,
                selectedCard === 'transactions' && styles.activeCard,
              ]}
              onPress={handleTransactionsPress}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../../../../assets/images/transactions.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.menuText}>TRANSACTIONS</Text>
            </TouchableOpacity>

            {/* Usage Card */}
            <TouchableOpacity
              style={[
                styles.menuCard,
                selectedCard === 'usage' && styles.activeCard,
              ]}
              onPress={handleUsagePress}
              activeOpacity={0.7}
            >
              <Image
                source={require('../../../../../assets/images/limit_usage.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.menuText}>USAGE</Text>
            </TouchableOpacity>
          </View>

          {/* Available Credit Section */}
          <View style={styles.creditContainer}>
            <Text style={styles.creditLabel}>
              Available Credit : <Text style={styles.creditAmount}>100</Text>
            </Text>
          </View>

          {/* Add Credit Button */}
          {/* <TouchableOpacity
            style={styles.addCreditButton}
            onPress={handleAddCreditPress}
            activeOpacity={0.8}
          >
            <Text style={styles.addCreditText}>ADD CREDIT</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Layout>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    // flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2.5),
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(3.5),
  },
  menuCard: {
    width: wp(28),
    height: hp(15),
    backgroundColor: '#efe5c2',
    borderRadius: wp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.8),
  },
  activeCard: {
    borderWidth: wp(0.5),
    borderColor: '#8B7355',
    backgroundColor: '#efe5c2',
  },
  logo: {
    width: wp(15), // Adjust image size relative to screen width
    height: wp(15), // Keep it square for consistency
    marginBottom: hp(1), // Add spacing between image & text
  },
  menuText: {
    fontSize: wp(3),
    fontWeight: '600',
    color: '#8B7355',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  creditContainer: {
    backgroundColor: '#efe5c2',
    borderRadius: wp(2),
    paddingVertical: hp(2.2),
    paddingHorizontal: wp(5),
    marginBottom: hp(2.5),
  },
  creditLabel: {
    fontSize: wp(4),
    color: '#8B7355',
    fontWeight: '500',
  },
  creditAmount: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#8B7355',
  },
  addCreditButton: {
    backgroundColor: '#60340f',
    borderRadius: wp(2),
    paddingVertical: hp(2.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCreditText: {
    color: '#FFFFFF',
    fontSize: wp(4),
    fontWeight: '600',
    letterSpacing: 1,
  },
});
