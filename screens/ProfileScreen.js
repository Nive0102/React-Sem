import React from 'react';
import { View, Text } from 'react-native';
import { Heading, Card, PrimaryButton } from '../components/Common';
import { useFinance } from '../context/FinanceContext';

export default function ProfileScreen({ navigation }) {
  const { user } = useFinance();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#F2F6FC' }}>
      <Heading>My Profile</Heading>

      <Card>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.name}</Text>
        <Text style={{ marginTop: 8 }}>Email: {user.email}</Text>
        <Text style={{ marginTop: 8 }}>Role: {user.role}</Text>
      </Card>

      <PrimaryButton
        title="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />

      <PrimaryButton
        title="Sign Out"
        onPress={() => navigation.replace('SignIn')}
      />
    </View>
  );
}