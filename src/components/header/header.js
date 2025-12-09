import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SILogo from '../../assets/images/logo.png';
import DateSelectModal from '../DateFilterModal/datefilterModal';
import { searchPDF } from '../../API/authAPI/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ onUploadPress, onSearch, onDateFilter, userId }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dateFilter, setDateFilter] = useState(false);
  const typingTimeout = useRef(null); 

const handleSearchChange = (text) => {
  setSearchText(text);

  if (!text.trim()) {
    onSearch("");  // reset
    return;
  }

  if (typingTimeout.current) clearTimeout(typingTimeout.current);

  typingTimeout.current = setTimeout(() => {
    onSearch(text); // only send query text
  }, 300);
};


  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.header}>
      {/* Logo or Search Box */}
      {isSearching ? (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={'#555'}
            value={searchText}
            onChangeText={handleSearchChange}
            autoFocus
          />

          <TouchableOpacity
            onPress={() => {
              setIsSearching(false);
              setSearchText('');
              handleSearchChange('');
            }}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <Image
          source={SILogo}
          style={{ width: '35%', height: '100%' }}
          resizeMode="contain"
        />
      )}

      {/* Right Icons */}
      <View style={styles.icons}>
        {!isSearching && (
          <TouchableOpacity onPress={() => setIsSearching(true)}>
            <Ionicons name="search" size={24} color="#555" />
          </TouchableOpacity>
        )}

        {/* Upload Icon */}
        <TouchableOpacity onPress={onUploadPress}>
          <Ionicons
            name="cloud-upload-outline"
            size={24}
            color="#555"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDateFilter(true)}>
          <Ionicons name="filter" size={24} color="#555" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <DateSelectModal
        visible={dateFilter}
        onClose={() => setDateFilter(false)}
        onSearch={(startDate, endDate) => {
          setDateFilter(false);
          const formattedStart = formatDate(startDate);
          const formattedEnd = formatDate(endDate);
          if (onDateFilter) {
            onDateFilter(formattedStart, formattedEnd); // send to parent
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ededed',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: '5%',
    justifyContent: 'space-between',
  },
  logo: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 16,
    fontWeight: '800',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    marginRight: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
});

export default Header;
