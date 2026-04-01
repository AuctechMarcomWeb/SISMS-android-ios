import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { updateDocumentByUser } from '../../../../API/documentAPI/documentAPI';
import { showToast } from '../../../../utils/toast';
const EditDocumentScreen = ({ route, navigation }) => {
  const { documentData } = route.params;

  const [invoice, setInvoice] = useState(documentData?.label || '');
  const [party, setParty] = useState(documentData?.description || '');
  const [loading, setLoading] = useState(false);
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const userId = await AsyncStorage.getItem('userId');

      const formData = new FormData();
      formData.append('user_id', String(userId));
      formData.append('docID', String(documentData?.docID));
      formData.append('label', invoice);
      formData.append('description', party);

      console.log('Sending:', {
        user_id: userId,
        docID: documentData?.docID,
        label: invoice,
        description: party,
      });

      const response = await updateDocumentByUser(formData);

      console.log('Response data:', response?.data);

      showToast({
        type: 'success',
        title: 'Success',
        message: response?.data?.message || 'Document updated successfully',
      });

      setTimeout(() => {
        navigation.goBack();
      }, 1200);
    } catch (error) {
      console.log('API error:', error?.response?.data || error.message);

      showToast({
        type: 'error',
        title: 'Update Failed',
        message: error?.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SI PRINT</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Edit Document details</Text>

        <Text style={styles.documentId}>
          {documentData?.file?.split('/').pop()}
        </Text>

        <TextInput
          style={styles.input}
          value={invoice}
          onChangeText={setInvoice}
          placeholder="Invoice"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          value={party}
          onChangeText={setParty}
          placeholder="Description"
          multiline
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>UPDATE</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditDocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#d6c799',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  documentId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#5c3815',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
