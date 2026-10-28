
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useFinance } from '../context/FinanceContext';

export default function FinanceAnalysis({ route }) {
  const { transactions } = useFinance();
  const [period, setPeriod] = useState(
    route?.params?.period ?? 'Daily'
  );

  useEffect(() => {
    if (route?.params?.period) {
      setPeriod(route.params.period);
    }
  }, [route?.params?.period]);

  // Read transaction fields from common data formats
  const getType = (item) =>
    String(item.type ?? item.transactionType ?? '')
      .trim()
      .toLowerCase();

  const getAmount = (item) => {
    const value = item.amount ?? item.value ?? 0;
    const amount = Number(
      String(value).replace(/[₹,\s]/g, '')
    );

    return Number.isFinite(amount) ? amount : 0;
  };

  const getDate = (item) => {
    const value =
      item.date ?? item.transactionDate ?? item.createdAt;

    if (!value) return null;

    // Parse YYYY-MM-DD as a local date
    if (
      typeof value === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      const [year, month, day] = value.split('-').map(Number);
      return new Date(year, month - 1, day);
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const today = new Date();

  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const startOfWeek = new Date(startOfDay);
  const daysSinceMonday = (today.getDay() + 6) % 7;
  startOfWeek.setDate(startOfWeek.getDate() - daysSinceMonday);

  const startOfNextWeek = new Date(startOfWeek);
  startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);

  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const startOfNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );

  const filteredTransactions = transactions.filter((item) => {
    const date = getDate(item);
    if (!date) return false;

    if (period === 'Daily') {
      return (
        date >= startOfDay &&
        date < new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        )
      );
    }

    if (period === 'Weekly') {
      return date >= startOfWeek && date < startOfNextWeek;
    }

    return date >= startOfMonth && date < startOfNextMonth;
  });

  const income = filteredTransactions
    .filter((item) => getType(item) === 'income')
    .reduce((total, item) => total + getAmount(item), 0);

  const expense = filteredTransactions
    .filter((item) => getType(item) === 'expense')
    .reduce((total, item) => total + getAmount(item), 0);

  const balance = income - expense;

  const money = (amount) =>
    '\u20B9' +
    amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>Finance Analysis</Text>

      <View style={styles.tabs}>
        {['Daily', 'Weekly', 'Monthly'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.tab,
              period === item && styles.activeTab,
            ]}
            onPress={() => setPeriod(item)}
          >
            <Text
              style={[
                styles.tabText,
                period === item && styles.activeTabText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>{period} Report</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Total Income</Text>
        <Text style={styles.income}>{money(income)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Expense</Text>
        <Text style={styles.expense}>{money(expense)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Remaining Balance</Text>
        <Text
          style={[
            styles.balance,
            balance < 0 && styles.negativeBalance,
          ]}
        >
          {money(balance)}
        </Text>
        <Text style={styles.hint}>Income - Expense</Text>
      </View>

      <Text style={styles.subtitle}>
        {period} Transactions
      </Text>

      {filteredTransactions.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.empty}>
            No transactions found for this {period.toLowerCase()}.
          </Text>
          <Text style={styles.hint}>
            Add a transaction with its type, amount and date.
          </Text>
        </View>
      ) : (
        filteredTransactions.map((item, index) => {
          const type = getType(item);
          const isIncome = type === 'income';
          const date = getDate(item);

          return (
            <View
              key={item.id ?? item._id ?? index}
              style={styles.transaction}
            >
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>
                  {item.title ??
                    item.category ??
                    item.description ??
                    (isIncome ? 'Income' : 'Expense')}
                </Text>

                <Text style={styles.date}>
                  {date ? date.toLocaleDateString('en-IN') : ''}
                </Text>

                <Text style={styles.type}>
                  {isIncome ? 'Income' : 'Expense'}
                </Text>
              </View>

              <Text
                style={[
                  styles.transactionAmount,
                  isIncome ? styles.income : styles.expense,
                ]}
              >
                {isIncome ? '+' : '-'}
                {money(getAmount(item))}
              </Text>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    color: '#333',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },
  income: {
    color: '#16a34a',
    fontSize: 21,
    fontWeight: 'bold',
  },
  expense: {
    color: '#dc2626',
    fontSize: 21,
    fontWeight: 'bold',
  },
  balance: {
    color: '#2563eb',
    fontSize: 24,
    fontWeight: 'bold',
  },
  negativeBalance: {
    color: '#dc2626',
  },
  hint: {
    color: '#777',
    fontSize: 12,
    marginTop: 6,
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  transactionInfo: {
    flex: 1,
    marginRight: 10,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  date: {
    color: '#777',
    marginTop: 5,
    fontSize: 12,
  },
  type: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  emptyCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  empty: {
    color: '#777',
    textAlign: 'center',
  },
});
