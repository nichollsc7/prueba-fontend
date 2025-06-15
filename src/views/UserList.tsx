import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchUsers } from '../store/userSlice';
import { User } from '../models/User';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch } from '../store/types';
import { DEFAULT_AVATAR, ITEMS_PER_PAGE } from '../constants';
import { useTheme } from '../context/ThemeContext';

type UserListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserList'>;

const CARD_WIDTH = Math.round(Dimensions.get('window').width * 0.8);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    width: '100%',
    maxWidth: 320,
    marginTop: 4,
    padding: 4,
    borderRadius: 16,
  },
  searchInput: {
    padding: 12,
    borderRadius: 8,
  },
  userItem: {
    marginBottom: 12,
    alignItems: 'center',
    width: CARD_WIDTH,
    alignSelf: 'center',
  },
  userItemTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderRadius: 20,
    width: '100%',
    minHeight: 70,
  },
  userItemContent: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  userEmail: {
    fontSize: 12,
    textAlign: 'left',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 24,
    backgroundColor: '#D1D5DB',
    marginLeft: 12,
  },
  arrow: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4F46E5',
    marginLeft: 8,
  },
  footer: {
    padding: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#EF4444',
  },
  contentContainer: {
    paddingBottom: 32,
    width: '100%',
    alignItems: 'center',
  },
});

export const UserList = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UserListNavigationProp>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered.slice(0, page * ITEMS_PER_PAGE));
  }, [searchQuery, users, page]);

  const loadMore = useCallback(() => {
    if (!isLoadingMore && filteredUsers.length < users.length) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, filteredUsers.length, users.length]);

  const renderUserItem = ({ item, index }: { item: User; index: number }) => (
    <View style={styles.userItem}>
      <TouchableOpacity
        style={[styles.userItemTouchable, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF', borderColor: isDarkMode ? '#4B5563' : '#E5E7EB' }]}
        onPress={() => navigation.navigate('UserDetail', { userId: item.id })}
      >
        <View style={styles.userItemContent}>
          <Text style={[styles.userName, { color: isDarkMode ? '#fff' : '#111827' }]}>{item.name}</Text>
          <Text style={[styles.userEmail, { color: isDarkMode ? '#d1d5db' : '#6B7280' }]}>{item.email}</Text>
        </View>
        <Image
          source={DEFAULT_AVATAR}
          style={styles.userAvatar}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  };

  if (loading && !isLoadingMore) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>Cargando usuarios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1a202c' : '#F3F4F6' }]}>
      <View style={{ alignItems: 'center', marginTop: 16, marginBottom: 8 }}>
        <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#374151' : '#FFFFFF' }]}>
          <TextInput
            style={[styles.searchInput, { backgroundColor: isDarkMode ? '#1a202c' : '#FFFFFF', color: isDarkMode ? '#fff' : '#111827' }]}
            placeholder="Buscar por nombre o email..."
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}; 