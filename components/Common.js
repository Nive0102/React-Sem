import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export function Heading({ children }) {
  return <Text style={styles.heading}>{children}</Text>;
}

export function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export function PrimaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function Field({ placeholder, value, onChangeText, keyboardType }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType || 'default'}
      autoCapitalize="none"
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#193B68',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  button: {
    backgroundColor: '#2457C5',
    padding: 14,
    borderRadius: 9,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5DCE8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});