import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TransactionDataSlice, TransactionState} from '../../types/types';
import {uploadToCloudinary} from '../imageSlice/imageSlice';
import axios from 'axios';

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
  status: 'idle',
  selectedCurrency: 'USD',
  exchangeRates: {},
};

export const fetchSelectedCurrency = createAsyncThunk(
  'transaction/fetchSelectedCurrency',
  async (_, {rejectWithValue}) => {
    const user = auth().currentUser;
    if (!user) return rejectWithValue('User not logged in');

    try {
      const doc = await firestore().collection('users').doc(user.uid).get();
      if (doc.exists) {
        const currencyrate = doc.data()?.selectedCurrency;
        return currencyrate;
      } else {
        return 'USD';
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const saveSelectedCurrency = createAsyncThunk(
  'transaction/saveSelectedCurrency',
  async (currency: string, {rejectWithValue}) => {
    const user = auth().currentUser;
    if (!user) return rejectWithValue('User not logged in');

    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({selectedCurrency: currency}, {merge: true});
      return currency;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeRates = createAsyncThunk(
  'transactions/fetchExchangeRates',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      return response.data.rates;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const addTransaction = createAsyncThunk(
  'transaction/addTransction',
  async (
    {
      category,
      description,
      amount,
      imageUri,
      type,
    }: {
      category: string;
      description: string;
      amount: string;
      imageUri: string;
      type: string;
    },
    {dispatch, rejectWithValue},
  ) => {
    try {
      let uploadedImageUrl = imageUri;

      if (imageUri) {
        const result = await dispatch(uploadToCloudinary(imageUri)).unwrap();
        uploadedImageUrl = result;
      }

      const uid = auth().currentUser?.uid;
      const useRef = await firestore().collection('users').doc(uid);

      const userDoc = await useRef.get();

      if (!userDoc.exists) {
        throw new Error('User does not exist');
      }

      const TransctionRef = await firestore().collection('transactions').add({
        userId: uid,
        category,
        description,
        amount,
        imageUri: uploadedImageUrl,
        type,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      const newTransaction = await TransctionRef.get();
      const transactionData = newTransaction.data();

      return {
        id: TransctionRef.id,
        userId: uid,
        category,
        description,
        amount,
        imageUri: uploadedImageUrl,
        type,
        timestamp:
          transactionData?.timestamp?.toDate().toISOString() ||
          new Date().toISOString(),
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async (_, {rejectWithValue}) => {
    try {
      const uid = auth().currentUser?.uid;
      if (!uid) throw new Error('User is not logged in');

      const transactionsRef = firestore()
        .collection('transactions')
        .where('userId', '==', uid)
        .orderBy('timestamp', 'desc');

      const snapshot = await transactionsRef.get();

      if (snapshot.empty) {
        return [];
      }

      const transactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp
          ? doc.data().timestamp.toDate().toISOString()
          : new Date().toISOString(),
      }));

      return transactions;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  'transaction/deleteTransaction',
  async (transactionId: string, {rejectWithValue}) => {
    try {
      const uid = auth().currentUser?.uid;
      if (!uid) throw new Error('User is not logged in');

      const transactionRef = firestore()
        .collection('transactions')
        .doc(transactionId);

      await transactionRef.delete();

      return transactionId;
    } catch (error: any) {
      console.error('Error deleting transaction:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload || '';
    },
  },
  extraReducers: builder => {
    builder.addCase(addTransaction.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions.push({
        ...action.payload,
        userId: action.payload.userId ?? '',
      });
      state.status = 'succeeded';
    });
    builder.addCase(addTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.status = 'failed';
    });
    builder.addCase(fetchTransactions.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload as TransactionDataSlice[];
      state.loading = false;
      state.status = 'succeeded';
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.status = 'failed';
    });
    builder.addCase(deleteTransaction.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = state.transactions.filter(
        transaction => transaction.id !== action.payload,
      );
      state.status = 'succeeded';
    });
    builder.addCase(deleteTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.status = 'failed';
    });
    builder.addCase(fetchExchangeRates.fulfilled, (state, action) => {
      state.exchangeRates = action.payload;
    });
    builder.addCase(saveSelectedCurrency.fulfilled, (state, action) => {
      state.selectedCurrency = action.payload;
    });
    builder.addCase(saveSelectedCurrency.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(fetchSelectedCurrency.fulfilled, (state, action) => {
      state.selectedCurrency = action.payload || 'USD';
    });
    builder.addCase(fetchSelectedCurrency.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const {setCurrency} = transactionSlice.actions;
export default transactionSlice.reducer;
