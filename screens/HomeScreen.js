import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Heading, Card, PrimaryButton } from '../components/Common';
import { useFinance } from '../context/FinanceContext';

export default function HomeScreen({ navigation }) {
  const { user, income, expense, balance, transactions } = useFinance();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F2F6FC', padding: 16 }}>
      <Heading>Welcome, {user.name}</Heading>

      <Card>
        <Text>Total Balance</Text>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#193B68' }}>
          ₹{balance.toLocaleString('en-IN')}
        </Text>
      </Card>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Card>
            <Text>Income</Text>
            <Text style={{ color: 'green', fontSize: 18, fontWeight: 'bold' }}>
              ₹{income.toLocaleString('en-IN')}
            </Text>
          </Card>
        </View>

        <View style={{ flex: 1 }}>
          <Card>
            <Text>Expense</Text>
            <Text style={{ color: '#D63C4A', fontSize: 18, fontWeight: 'bold' }}>
              ₹{expense.toLocaleString('en-IN')}
            </Text>
          </Card>
        </View>
      </View>

      <Heading>Reports</Heading>
      <PrimaryButton
        title="Daily Report"
        onPress={() => navigation.navigate('Analysis', { period: 'Daily' })}
      />
      <PrimaryButton
        title="Weekly Report"
        onPress={() => navigation.navigate('Analysis', { period: 'Weekly' })}
      />
      <PrimaryButton
        title="Monthly Report"
        onPress={() => navigation.navigate('Analysis', { period: 'Monthly' })}
      />

      <Heading>Recent Transactions</Heading>
      {transactions.slice(0, 4).map(item => (
        <Card key={item.id}>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.category} · {item.type}</Text>
          <Text style={{ color: item.type === 'Income' ? 'green' : '#D63C4A' }}>
            {item.type === 'Income' ? '+' : '-'}₹{item.amount}
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
}