import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Heading, Field, PrimaryButton } from '../components/Common';
import { useFinance } from '../context/FinanceContext';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useFinance();

  function signIn() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation', 'Enter email and password');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Validation', 'Enter a valid email address');
      return;
    }

    setUser({
      name: email.split('@')[0],
      email,
      role: 'Customer',
    });

    navigation.replace('Main');
  }

  return (
    <View style={{ flex: 1, padding: 22, justifyContent: 'center', backgroundColor: '#F2F6FC' }}>
      <Heading>Finance Tracker</Heading>
      <Text style={{ marginBottom: 18 }}>Sign in to manage your money</Text>

      <Field placeholder="Email" value={email} onChangeText={setEmail} />
      <Field
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <PrimaryButton title="Sign In" onPress={signIn} />
      <PrimaryButton
        title="Create Account"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}