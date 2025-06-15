import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchUserById } from '../store/userSlice';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch } from '../store/types';
import { DEFAULT_AVATAR } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { UserDetailProps } from '../types/navigation';

type UserDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserDetail'>;
type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

export const UserDetail: React.FC<UserDetailProps> = ({ route }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UserDetailNavigationProp>();
  const { userId } = route.params;
  const { selectedUser, loading, error } = useSelector((state: RootState) => state.users);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#1a202c' : '#fff' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ fontSize: 18, marginTop: 16, color: isDarkMode ? '#fff' : '#6b7280' }}>Cargando detalles del usuario...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#1a202c' : '#fff' }}>
        <Text style={{ fontSize: 18, color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (!selectedUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#1a202c' : '#fff' }}>
        <Text style={{ fontSize: 18, color: isDarkMode ? '#fff' : '#6b7280' }}>Usuario no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: isDarkMode ? '#1a202c' : '#fff' }} contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}>
      <View style={{ marginTop: 8, marginBottom: 4 }}>
        <Image
          source={DEFAULT_AVATAR}
          style={{ width: 128, height: 128, borderWidth: 4, borderColor: '#4F46E5', borderRadius: 9999, backgroundColor: '#e2e8f0' }}
          resizeMode="cover"
        />
      </View>
      <View style={{ width: '100%', maxWidth: 400, padding: 4 }}>
        <View style={{ backgroundColor: isDarkMode ? '#2d3748' : '#fff', padding: 8, borderRadius: 20, elevation: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 2, color: isDarkMode ? '#fff' : '#1F2937' }}>{selectedUser.name}</Text>
          <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 6, color: isDarkMode ? '#fff' : '#6b7280' }}>{selectedUser.email}</Text>
          <View style={{ marginBottom: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Ionicons name="call-outline" size={20} color={isDarkMode ? '#fff' : '#4F46E5'} />
              <Text style={{ marginLeft: 2, fontSize: 16, fontWeight: '600', color: isDarkMode ? '#fff' : '#4F46E5' }}>Teléfono</Text>
            </View>
            <Text style={{ marginLeft: 7, fontSize: 16, color: isDarkMode ? '#fff' : '#6b7280' }}>{selectedUser.phone}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Ionicons name="location-outline" size={20} color={isDarkMode ? '#fff' : '#4F46E5'} />
            <Text style={{ marginLeft: 2, fontSize: 16, fontWeight: '600', color: isDarkMode ? '#fff' : '#4F46E5' }}>Dirección</Text>
          </View>
          <Text style={{ marginLeft: 7, fontSize: 16, color: isDarkMode ? '#fff' : '#6b7280' }}>{selectedUser.address.street}, {selectedUser.address.suite}</Text>
          <Text style={{ marginLeft: 7, fontSize: 16, color: isDarkMode ? '#fff' : '#6b7280' }}>{selectedUser.address.city}, {selectedUser.address.zipcode}</Text>
          <View style={{ marginBottom: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Ionicons name="business-outline" size={20} color={isDarkMode ? '#fff' : '#4F46E5'} />
              <Text style={{ marginLeft: 2, fontSize: 16, fontWeight: '600', color: isDarkMode ? '#fff' : '#4F46E5' }}>Empresa</Text>
            </View>
            <Text style={{ marginLeft: 7, fontSize: 16, fontWeight: '600', color: isDarkMode ? '#fff' : '#4F46E5' }}>{selectedUser.company.name}</Text>
            <Text style={{ marginLeft: 7, fontSize: 16, fontStyle: 'italic', color: isDarkMode ? '#fff' : '#6b7280' }}>{selectedUser.company.catchPhrase}</Text>
          </View>
          <TouchableOpacity
            style={{ backgroundColor: '#4F46E5', padding: 16, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', marginLeft: 2 }}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
}); 