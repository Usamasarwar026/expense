import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";

// ✅ Async Thunk for Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { name, email, password }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // 🔹 Create user in Firebase Authentication
      const response = await auth().createUserWithEmailAndPassword(email, password);
      const user = response.user;

      // 🔹 Send Email Verification
      await user.sendEmailVerification();

      // 🔹 Save user details to Firestore
      await firestore().collection("users").doc(user.uid).set({
        uid: user.uid,
        name: name,
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // ✅ Return user data for Redux state
      return { uid: user.uid, name: name, email: user.email };
    } catch (error: any) {
      let errorMessage = "Authentication failed";
      
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Weak password";
      }

      // 🔹 Show Toast Message for Errors
      Toast.show({
        type: "error",
        text1: errorMessage,
        position: "top",
        visibilityTime: 2000,
        autoHide: true,
      });

      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ Redux Slice
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export Reducer
export default authSlice.reducer;
