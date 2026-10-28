import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Heading, Field, PrimaryButton } from '../components/Common';
import { useFinance } from '../context/FinanceContext';

export default function EditProfileScreen({ navigation }) {
  const { user, updateProfile } = useFinance();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  function saveProfile() {
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      Alert.alert('Validation', 'Enter a valid name and email');
      return;
    }

    updateProfile(name.trim(), email.trim());
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F2F6FC' }}>
      <Heading>Edit Profile</Heading>

      <Field placeholder="Name" value={name} onChangeText={setName} />
      <Field placeholder="Email" value={email} onChangeText={setEmail} />

      <PrimaryButton title="Save Changes" onPress={saveProfile} />
    </View>
  );
}