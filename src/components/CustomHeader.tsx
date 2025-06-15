import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

// El header debe tener altura fija para centrar el texto y el botón
const HEADER_HEIGHT = 48;

// El header debe tener el texto centrado y el botón a la derecha, sin afectar el centrado visual
export const CustomHeader: React.FC<{ title: string }> = ({ title }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View
      style={[
        {
          height: HEADER_HEIGHT,
          justifyContent: 'center',
          backgroundColor: isDarkMode ? '#111827' : '#fff',
        },
      ]}
    >
      <Text
        style={[
          {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            width: '100%',
            color: isDarkMode ? '#fff' : '#1F2937',
            lineHeight: HEADER_HEIGHT,
          },
        ]}
      >
        {title}
      </Text>
      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.rightButton, { backgroundColor: isDarkMode ? '#374151' : '#E5E7EB', borderRadius: 999, padding: 8 }]}
      >
        <Ionicons
          name={isDarkMode ? 'sunny' : 'moon'}
          size={24}
          color={isDarkMode ? '#FCD34D' : '#4B5563'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rightButton: {
    position: 'absolute',
    right: 16,
    top: 0,
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 