
import { IMAGES } from "../../constant/image";

export const transactions = [
    {
      id: 1,
      title: 'Shopping',
      subtitle: 'Buy some grocery',
      amount: '- $150',
      time: '10:00 AM',
      image: IMAGES.SHOPPING,
    },
    {
      id: 2,
      title: 'Subscription',
      subtitle: 'Disney+ Annual..',
      amount: '- $80',
      time: '03:30 AM',
      image: IMAGES.RECURRING_BILL,
    },
    {
      id: 3,
      title: 'Food',
      subtitle: 'Buy a ramen',
      amount: '- $32',
      time: '12:00 PM',
      image: IMAGES.RESTAURANT,
    },
  ];
  
export const newTransaction = [
  {
    id: 1,
    title: 'Salary',
    subtitle: 'Salary for July',
    amount: '+ $5000',
    time: '09:00 PM',
    image: IMAGES.SALARY,
  },
  {
    id: 2,
    title: 'Transportation',
    subtitle: 'Charging Tesla',
    amount: '- $18',
    time: '10:00 AM',
    image: IMAGES.CAR,
  }
]