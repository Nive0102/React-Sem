import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Heading, Card } from '../components/Common';
import { useFinance } from '../context/FinanceContext';

export default function CategoryDetailsScreen({ route }) {
  const { transactions } = useFinance();
  const category = route.params?.category || 'Food';

  const filtered = transactions.filter(
    item => item.category.toLowerCase() === category.toLowerCase()
  );

  const total = filtered.reduce((sum, item) => sum + item.amount, 0);

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#F2F6FC' }}>
      <Heading>{category} Details</Heading>

      <Card>
        <Text>Total Transactions: {filtered.length}</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 8 }}>
          Total Amount: ₹{total}
        </Text>
      </Card>

      {filtered.map(item => (
        <Card key={item.id}>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.type}</Text>
          <Text>₹{item.amount}</Text>
          <Text>{item.date}</Text>
        </Card>
      ))}

      {filtered.length === 0 && <Text>No transactions in this category.</Text>}
    </ScrollView>
  );
}