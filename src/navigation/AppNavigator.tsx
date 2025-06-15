import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserList } from '../views/UserList';
import { UserDetail } from '../views/UserDetail';
import { CustomHeader } from '../components/CustomHeader';
import { useTheme } from '../context/ThemeContext';

export type RootStackParamList = {
  UserList: undefined;
  UserDetail: { userId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isDarkMode } = useTheme();

  return (
    <NavigationContainer
      theme={{
        dark: isDarkMode,
        colors: {
          primary: '#4F46E5',
          background: isDarkMode ? '#1F2937' : '#F3F4F6',
          card: isDarkMode ? '#111827' : '#FFFFFF',
          text: isDarkMode ? '#FFFFFF' : '#1F2937',
          border: isDarkMode ? '#374151' : '#E5E7EB',
          notification: '#4F46E5',
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="UserList"
        screenOptions={{
          header: ({ route, options }) => (
            <CustomHeader title={options.title || route.name} />
          ),
        }}
      >
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={{
            title: 'Lista de Usuarios',
          }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{
            title: 'Detalles del Usuario',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 