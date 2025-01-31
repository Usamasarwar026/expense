import {IMAGES} from '../../constant/image';

export const transactions = [
  {
    id: 1,
    // title: 'Shopping',
    subtitle: 'Buy some grocery',
    time: '10:00 AM',
    image: IMAGES.SHOPPING,
    categoryName: 'Shopping',
    amount: '-$120',
    progress: 0.7,
    color: '#FCAC12',
    textColor: '#FD3C4A',
    type: 'Expense'
  },
  {
    id: 2,
    // title: 'Subscription',
    subtitle: 'Disney+ Annual..',
    time: '03:30 AM',
    image: IMAGES.RECURRING_BILL,
    categoryName: 'Subcription',
    amount: '-$80',
    progress: 0.5,
    color: '#7F3DFF',
    textColor: '#FD3C4A',
    type: 'Expense'
  },
  {
    id: 3,
    // title: 'Food',
    subtitle: 'Buy a ramen',
    time: '12:00 PM',
    image: IMAGES.RESTAURANT,
    categoryName: 'Food',
    amount: '-$32',
    progress: 0.3,
    color: '#007BFF',
    textColor: '#FD3C4A',
    type: 'Expense'
  },
];

export const newTransaction = [
  {
    id: 1,
    // title: 'Salary',
    subtitle: 'Salary for July',
    amount: '+ $5000',
    time: '09:00 PM',
    image: IMAGES.SALARY,
    categoryName: 'Salary',
    progress: 0.8,
    color: '#00A86B',
    textColor: '#00A86B',
    type: 'Income'
  },
  {
    id: 2,
    // title: 'Transportation',
    subtitle: 'Charging Tesla',
    amount: '- $18',
    time: '10:00 AM',
    image: IMAGES.CAR,
    categoryName: 'Transportation',
    progress: 0.6,
    color: 'black',
    textColor: '#00A86B',
    type: 'Income'
  },
];
