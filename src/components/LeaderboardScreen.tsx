// LeaderboardScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { BASE_URL } from '../config';

interface LeaderboardEntry {
  username: string;
  petName: string;
  currentStreak: number;
}

const LeaderboardScreen: React.FC<any> = ({ navigation }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchLeaderboard = async () => {
    try {
      const token = await EncryptedStorage.getItem('auth_token');
      const response = await fetch(`${BASE_URL}/api/pets/leaderboard`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
      } else {
        Alert.alert('Error', 'Failed to fetch leaderboard.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching leaderboard.');
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLeaderboard();
    setRefreshing(false);
  };

  const renderItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.petName}>{item.petName}</Text>
        <Text style={styles.username}>({item.username})</Text>
      </View>
      <Text style={styles.streak}>Streak: {item.currentStreak}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rank: {
    fontSize: 18,
    width: 30,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    marginLeft: 5,
    color: '#555',
  },
  streak: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LeaderboardScreen;
