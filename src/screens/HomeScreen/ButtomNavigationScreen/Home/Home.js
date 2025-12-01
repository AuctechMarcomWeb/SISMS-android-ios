import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Platform,
  StatusBar,
} from 'react-native';
import * as DocumentPicker from '@react-native-documents/picker';

import RNFetchBlob from 'react-native-blob-util';
import Header from '../../../../components/header/header';
import Layout from '../../../../components/layout/layout';
import DownImg from '../../../../assets/images/down.png';
import dotIcon from '../../../../assets/images/options_big.png';
import DocumentModal from '../../../../components/documentModal/documentModal';
import ConfirmUploadModal from '../../../../components/confirmUploadModal/confirmUploadModal';
import {
  FetchUserDetails,
  searchPDF,
  searchPDFByDate,
  UploadAPI,
  UploadPDF,
} from '../../../../API/authAPI/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  handleDownload,
  handleShare,
} from '../../../../utils/Functions/requestPermissions';
import styles from './HomeStyles';
import { useDispatch } from 'react-redux';
import { login } from '../../../../redux/slices/authSlice';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({});
  const [userInvoice, setUserInvoice] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [isMoreData, setIsMoreData] = useState(true);
  const [fullData, setFullData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const convertToTimestamp = dateStr => {
    // dateStr format: "dd-mm-yyyy"
    const [day, month, year] = dateStr.split('-');
    const dateObj = new Date(`${year}-${month}-${day}T00:00:00`);
    return dateObj.getTime(); // returns milliseconds
  };

  const handleUploadPress = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setSelectedFile(file);
      setUploadModalVisible(true);
      console.log('Picked file:', file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled picker');
      } else {
        console.error('Picker error:', err);
      }
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await UserDetails(); // Refresh invoices
    } catch (error) {
      console.log('Error in pull-to-refresh:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const UserDetails = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');

    try {
      const response = await FetchUserDetails({ userId, offset: 0 });
      const invoices = response?.data?.invoices || [];

      setFullData(invoices);
    } catch (error) {
      console.log('Error UserDetails:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (fullData.length > 0) {
      handlePagination(1); // auto show first page
    }
  }, [fullData]);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;
  const totalPages = Math.ceil(fullData.length / limit);

  const handlePagination = pageNum => {
    setCurrentPage(pageNum);

    const offset = (pageNum - 1) * limit;
    const sliced = fullData.slice(offset, offset + limit);
    setDisplayData(sliced);
  };

  const paginationRange = () => {
    const pagesToShow = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
    } else {
      if (currentPage <= 3) {
        pagesToShow.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pagesToShow.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pagesToShow.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        );
      }
    }

    return pagesToShow;
  };

  const UploadDocument = async selectedFile => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const owner = userData?.phone;

      if (!selectedFile || !selectedFile[0]) {
        Alert.alert('No file selected');
        return;
      }

      const file = selectedFile[0];

      const formData = new FormData();

      formData.append('id', String(userId));
      formData.append('owner', String(owner));
      formData.append('description', 'SELF');

      formData.append('pdf', {
        uri:
          Platform.OS === 'android'
            ? file.uri
            : file.uri.replace('file://', ''),
        name: file.name || 'document.pdf',
        type: file.type || 'application/pdf',
      });

      for (let pair of formData._parts) {
        console.log(pair[0], pair[1]);
      }

      // Use your UploadAPI instance
      const response = await UploadAPI.post('uploadPdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data, headers) => data, // ensures RN FormData is sent correctly
      });

      console.log('Uploaded document API response:', response.data);

      if (response.status === 200 && response.data) {
        Alert.alert(
          'Success',
          response.data.message || 'File uploaded successfully!',
        );
        setUploadModalVisible(false);
        // optionally refresh dashboard here
        // callDashboardApi();
        await UserDetails();
      }
    } catch (error) {
      console.error(
        'Error while uploading document:',
        error.response?.data || error.message,
      );
      Alert.alert(
        'Error',
        error.response?.data?.message || 'File upload failed.',
      );
    }
  };

  const handleSearch = (text = '') => {
    console.log('search text:', text);

    const query = typeof text === 'string' ? text : '';

    if (!query.trim()) {
      handlePagination(1); // reset pagination
      return;
    }

    const filtered = fullData.filter(
      item =>
        item?.label?.toLowerCase().includes(query.toLowerCase()) ||
        item?.file?.toLowerCase().includes(query.toLowerCase()),
    );

    setDisplayData(filtered.slice(0, limit));
    setCurrentPage(1);
  };

  const fetchDocuments = async (startDate, endDate) => {
    console.log('Filter dates:', startDate, endDate);
    const userId = await AsyncStorage.getItem('UserID');
    if (!userId) return console.warn('User ID not found');

    if (!startDate.trim() && !endDate.trim()) {
      try {
        setLoading(true);

        // Call same function that loads full data initially
        await UserDetails(); // ✅ This ensures data consistency
      } catch (error) {
        console.log('Error fetching all data after clearing search:', error);
      } finally {
        setLoading(false);
      }
      return;
    }
    const startTimestamp = convertToTimestamp(startDate);
    const endTimestamp = convertToTimestamp(endDate);
    try {
      setLoading(true);
      const response = await searchPDFByDate({
        user_id: userId,
        starting: startTimestamp.toString(),
        ending: endTimestamp.toString(),
        offset: 0,
      });

      console.log('Response on date filter', response);

      // ✅ Update state only if API returns valid data
      if (response?.data?.status === 200 || response?.data?.success === true) {
        const filteredData = response?.data?.data || [];
        setUserInvoice(filteredData);
      } else {
        setUserInvoice([]); // clear if no data
      }
    } catch (error) {
      console.log('Error while applying date filter', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    UserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Loader Overlay */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#6B4226" />
        </View>
      )}

      <Layout>
        <Header
          onUploadPress={handleUploadPress}
          onSearch={handleSearch}
          onDateFilter={fetchDocuments}
        />

        <View style={{ backgroundColor: '#e0cd8b', padding: '2%' }}>
          <Text style={styles.heading}>Recent uploads</Text>
        </View>

        <View style={styles.headerRow}>
          <View style={{ flex: 2 }}>
            <Text style={styles.headerText}>Date Time</Text>
          </View>
          <View style={{ flex: 1.5 }}>
            <Text style={styles.headerText}>Label</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.headerText}>Documents</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerText}>Share</Text>
          </View>
        </View>

        {displayData?.length > 0 ? (
          <FlatList
            data={displayData}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={DownImg} style={styles.shareIconImage} />

                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>
                    {item?.date.split(' ')[0]}
                  </Text>
                  <Text style={styles.cardText}>{item?.label}</Text>
                  <Text
                    style={styles.cardText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item?.file.split('/').pop()}
                  </Text>

                  <TouchableOpacity
                    style={styles.shareButton}
                    onPress={() => {
                      setSelectedInvoice(item);
                      setModalVisible(true);
                    }}
                  >
                    <Image source={dotIcon} style={styles.shareIconImage} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#cfbd57ff']}
                tintColor="#cfbd57ff"
              />
            }
          />
        ) : (
          <View style={styles.emptyState}>
            <Image
              source={require('../../../../assets/images/empty-folder.png')}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>No Invoices Found</Text>
            <Text style={styles.emptySubtitle}>
              You haven't uploaded any invoices yet.
            </Text>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUploadPress}
            >
              <Text style={styles.uploadButtonText}>Upload Now</Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginVertical: 10,
          }}
        >
          {/* Prev Button */}
          <TouchableOpacity
            disabled={currentPage === 1}
            onPress={() => handlePagination(currentPage - 1)}
            style={{
              padding: 6,
              opacity: currentPage === 1 ? 0.4 : 1,
            }}
          >
            <Text style={{ fontSize: 18 }}>‹</Text>
          </TouchableOpacity>

          {/* Numbers with Dots */}
          {paginationRange().map((item, index) =>
            item === '...' ? (
              <Text key={index} style={{ marginHorizontal: 6, fontSize: 16 }}>
                ...
              </Text>
            ) : (
              <TouchableOpacity
                key={index}
                onPress={() => handlePagination(item)}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 3,
                  backgroundColor: currentPage === item ? '#c9b04e' : '#fff',
                  borderWidth: 1,
                  borderColor: '#c9b04e',
                }}
              >
                <Text
                  style={{
                    color: currentPage === item ? '#fff' : '#c9b04e',
                    fontWeight: '700',
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ),
          )}

          {/* Next Button */}
          <TouchableOpacity
            disabled={currentPage === totalPages}
            onPress={() => handlePagination(currentPage + 1)}
            style={{
              padding: 6,
              opacity: currentPage === totalPages ? 0.4 : 1,
            }}
          >
            <Text style={{ fontSize: 18 }}>›</Text>
          </TouchableOpacity>
        </View>
      </Layout>

      <DocumentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={{
          fileUrl: selectedInvoice?.file,
          fileName: selectedInvoice?.file?.split('/').pop() || '',
          date: selectedInvoice?.date || '',
          label: selectedInvoice?.label || '',
          description: selectedInvoice?.description || 'SELF',
          uploadedBy: selectedInvoice?.source_name || 'SELF',
        }}
        onEdit={() => navigation.navigate('EditDocumentScreen')}
        onShare={() => handleShare(selectedInvoice?.file)}
        onDownload={() =>
          handleDownload(
            selectedInvoice?.file,
            selectedInvoice?.file?.split('/').pop(),
          )
        }
        navigation={navigation}
      />

      <ConfirmUploadModal
        visible={uploadModalVisible}
        onClose={() => setUploadModalVisible(false)}
        fileName={selectedFile?.[0]?.name || ''}
        onConfirm={async () => {
          console.log('Confirmed file:', selectedFile);
          await UploadDocument(selectedFile);
        }}
      />
    </View>
  );
};

export default Home;
