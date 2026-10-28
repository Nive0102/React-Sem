import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Heading, Card, Field, PrimaryButton } from '../components/Common';
import { useFinance } from '../context/FinanceContext';

export default function TransactionsScreen() {
  const { transactions, addTransaction } = useFinance();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('Expense');
  const [month, setMonth] = useState('October');

  function saveTransaction() {
    const numericAmount = Number(amount);

    if (!title.trim() || !amount.trim() || numericAmount <= 0 || !Number.isFinite(numericAmount)) {
      Alert.alert('Validation', 'Enter a title and a valid amount');
      return;
    }

    addTransaction({
      title: title.trim(),
      amount: numericAmount,
      category: category.trim() || 'Other',
      type,
      month,
    });

    setTitle('');
    setAmount('');
  }

  const monthTransactions = transactions.filter(item => item.month === month);

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#F2F6FC' }}>
      <Heading>Add Transaction</Heading>

      <Field placeholder="Transaction Title" value={title} onChangeText={setTitle} />
      <Field
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Field placeholder="Category (Food, Travel...)" value={category} onChangeText={setCategory} />

      <PrimaryButton
        title={type === 'Income' ? 'Type: Income (tap to change)' : 'Type: Expense (tap to change)'}
        onPress={() => setType(type === 'Income' ? 'Expense' : 'Income')}
      />

      <PrimaryButton
        title={`Month: ${month} (tap to change)`}
        onPress={() => {
          const months = ['October', 'November', 'December'];
          setMonth(months[(months.indexOf(month) + 1) % months.length]);
        }}
      />

      <PrimaryButton title="Save Transaction" onPress={saveTransaction} />

      <Heading>{month} Transactions</Heading>

      {monthTransactions.map(item => (
        <Card key={item.id}>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.category} · {item.type}</Text>
          <Text>₹{item.amount}</Text>
          <Text>{item.date}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}