import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Heading, Card } from '../components/Common';
import { useFinance } from '../context/FinanceContext';

const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Salary', 'Other'];

export default function CategoriesScreen({ navigation }) {
  const { transactions } = useFinance();

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#F2F6FC' }}>
      <Heading>Overall Categories</Heading>

      {categories.map(category => {
        const total = transactions
          .filter(item => item.category.toLowerCase() === category.toLowerCase())
          .reduce((sum, item) => sum + item.amount, 0);

        return (
          <Card key={category}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{category}</Text>
            <Text>Total: ₹{total}</Text>
            <Text
              style={{ color: '#2457C5', marginTop: 8 }}
              onPress={() => navigation.navigate('CategoryDetails', { category })}
            >
              View Details →
            </Text>
          </Card>
        );
      })}
    </ScrollView>
  );
}