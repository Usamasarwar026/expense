import  auth  from '@react-native-firebase/auth';
import  firestore  from '@react-native-firebase/firestore';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const addTransaction = createAsyncThunk(
    "transaction/addTransction",
    async ({ category, description, amount ,imageUri, type}:{ category: string, description: string, amount: string, imageUri:string, type: string}, { rejectWithValue }) => {
        try {
            const uid = auth().currentUser?.uid;
            const useRef = await firestore().collection('users').doc(uid);

            const userDoc = await useRef.get();

            if (!userDoc.exists) {
                console.log(`User with ID ${uid} does not exist.`);
                throw new Error('User does not exist');
            }

            const TransctionRef = await firestore().collection('transactions').add({
                userId: uid,
                category,
                description,
                amount,
                imageUri,
                type,
                // timestamp: firestore.FieldValue.serverTimestamp(),
                timestamp: firestore.FieldValue.serverTimestamp(), 
            })

            // console.log('Transaction added with ID:', TransctionRef.id);
            const newTransaction = await TransctionRef.get();
            const transactionData = newTransaction.data();

            return(
                {
                    id: TransctionRef.id,
                    userId: uid,
                    category,
                    description,
                    amount,
                    imageUri,
                    type,
                    timestamp: transactionData?.timestamp?.toDate().toISOString() || new Date().toISOString(),
                }
            )
        }catch(error:any){
            console.log('Error while adding transaction:', error);
            return rejectWithValue(error.message);
        }
    }
)
export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions",
    async (_, { rejectWithValue }) => {
      try {
        const uid = auth().currentUser?.uid;
        if (!uid) throw new Error("User is not logged in");
  
        const transactionsRef = firestore()
          .collection("transactions")
          .where("userId", "==", uid)
          .orderBy("timestamp", "desc");
  
        const snapshot = await transactionsRef.get();
  
        if (snapshot.empty) {
          console.log("No transactions found.");
          return []; // Return empty array if no transactions
        }
  
        const transactions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp
            ? doc.data().timestamp.toDate().toISOString()
            : new Date().toISOString(),
        }));
  
        return transactions;
      } catch (error: any) {
        console.log("Error while fetching transactions:", error);
        return rejectWithValue(error.message);
      }
    }
  );

  export const deleteTransaction = createAsyncThunk(
    "transaction/deleteTransaction",
    async (transactionId: string, { rejectWithValue }) => {
      try {
        const uid = auth().currentUser?.uid;
        if (!uid) throw new Error("User is not logged in");
        
  
        const transactionRef = firestore().collection("transactions").doc(transactionId);
  
        await transactionRef.delete();
  
        console.log(`Transaction ${transactionId} deleted successfully.`);
        return transactionId; // Return ID to remove it from Redux state
      } catch (error: any) {
        console.error("Error deleting transaction:", error);
        return rejectWithValue(error.message);
      }
    }
  );
  
  

export const transactionSlice = createSlice(
    {
        name: "transaction",
        initialState: {
            transactions: [],
            loading: false,
            error: null,
            status: 'idle',
        },
        reducers: {},
        extraReducers: builder =>{
            builder.addCase(addTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            builder.addCase(addTransaction.fulfilled, (state, action) => {
                
                state.loading = false;
                state.transactions = action.payload;
                state.status ='succeeded';
            })
            builder.addCase(addTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status ='failed';
            })
            builder.addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            builder.addCase(fetchTransactions.fulfilled, (state, action) => {
                console.log("Redux Data Fetched:", action.payload);
                state.transactions = action.payload;
                state.loading = false;
                state.status ='succeeded';
            })
            builder.addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status ='failed';
            })
            builder.addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
              });
              builder.addCase(deleteTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.filter(
                  (transaction) => transaction.id !== action.payload
                );
                state.status = "succeeded";
              });
              builder.addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = "failed";
              });
              
            
            
        }
    }
)

export default transactionSlice.reducer; 