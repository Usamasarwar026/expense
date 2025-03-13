import moment from 'moment';
import {
  GroupedTransactions,
  TimeReturnType,
  Transaction,
} from '../../types/types';

export const Time = (
  transactions: Transaction[] | any,
  selectedMonth: string | null,
): TimeReturnType => {
  if (!Array.isArray(transactions)) {
    console.warn(
      'Warning: Transactions is not an array. Returning empty object.',
    );
    return {};
  }

  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'day').startOf('day');
  const startOfWeek = moment().startOf('week');
  const startOfMonth = moment().startOf('month');

  if (selectedMonth && selectedMonth !== 'All') {
    const startOfSelectedMonth = moment(selectedMonth, 'MMMM').startOf('month');
    const endOfSelectedMonth = moment(selectedMonth, 'MMMM').endOf('month');

    return {
      [selectedMonth]: transactions?.filter((transaction: any) =>
        moment(transaction.timestamp).isBetween(
          startOfSelectedMonth,
          endOfSelectedMonth,
          'day',
          '[]',
        ),
      ),
    };
  }

  const grouped: GroupedTransactions = {
    Today: [],
    Yesterday: [],
    'This Week': [],
    'This Month': [],
    Older: [],
  };

  transactions?.forEach((transaction: Transaction) => {
    const transactionDate = moment(transaction.timestamp);

    if (transactionDate.isSame(today, 'day')) {
      grouped.Today.push(transaction);
    } else if (transactionDate.isSame(yesterday, 'day')) {
      grouped.Yesterday.push(transaction);
    } else if (transactionDate.isSameOrAfter(startOfWeek)) {
      grouped['This Week'].push(transaction);
    } else if (transactionDate.isSameOrAfter(startOfMonth)) {
      grouped['This Month'].push(transaction);
    } else {
      grouped.Older.push(transaction);
    }
  });

  return grouped;
};
