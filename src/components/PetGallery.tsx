import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { BASE_URL } from '../config';
import PetCard from './PetCard';

interface PetGalleryProps {
  username: string;
  onCosmeticSelected: () => void; // Callback to refresh pet data
}

const PetGallery: React.FC<PetGalleryProps> = ({ username, onCosmeticSelected }) => {
  const [cosmetics, setCosmetics] = useState<string[]>([]);

  const fetchCosmetics = async () => {
    try {
      const token = await EncryptedStorage.getItem('auth_token');
      const response = await fetch(`${BASE_URL}/api/pets/${username}/unlocked`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCosmetics(data);
      } else {
        Alert.alert('Error', 'Failed to fetch unlocked cosmetics.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching cosmetics.');
    }
  };

  useEffect(() => {
    fetchCosmetics();
  }, []);

  const selectCosmetic = async (cosmetic: string) => {
    try {
      const token = await EncryptedStorage.getItem('auth_token');
      const response = await fetch(`${BASE_URL}/api/pets/${username}/active`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activeType: cosmetic }),
      });
      if (response.ok) {
        Alert.alert('Success', 'Active pet updated successfully.');
        onCosmeticSelected();
      } else {
        Alert.alert('Error', 'Failed to update active pet.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong updating active pet.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Pet Cosmetic</Text>
      <FlatList
        data={cosmetics}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <PetCard cosmetic={item} onSelect={selectCosmetic} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default PetGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  // This applies styling to each row of columns
  columnWrapper: {
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
});
