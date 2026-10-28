import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Heading, Field, PrimaryButton } from '../components/Common';
import { useFinance } from '../context/FinanceContext';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useFinance();

  function signUp() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Validation', 'Fill in all fields');
      return;
    }

    if (!email.includes('@') || password.length < 6) {
      Alert.alert(
        'Validation',
        'Enter a valid email and password with at least 6 characters'
      );
      return;
    }

    setUser({ name, email, role: 'Customer' });
    Alert.alert('Success', 'Account created successfully');
    navigation.replace('Main');
  }

  return (
    <View style={{ flex: 1, padding: 22, justifyContent: 'center', backgroundColor: '#F2F6FC' }}>
      <Heading>Create Account</Heading>

      <Field placeholder="Full Name" value={name} onChangeText={setName} />
      <Field placeholder="Email" value={email} onChangeText={setEmail} />
      <Field
        placeholder="Password (minimum 6 characters)"
        value={password}
        onChangeText={setPassword}
      />

      <PrimaryButton title="Sign Up" onPress={signUp} />
      <Text onPress={() => navigation.navigate('SignIn')} style={{ textAlign: 'center', marginTop: 12 }}>
        Already have an account? Sign In
      </Text>
    </View>
  );
}