import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth, { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// ✅ Async Thunk for Signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (
    {name, email, password}: {name: string; email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      // 🔹 Create user in Firebase Authentication
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = response.user;
      console.log('user data from slice', user.uid);

      await firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        name: name,
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return {uid: user.uid, name: name, email: user.email};
    } catch (error: any) {
      console.log('Firebase Auth Error:', error.code, error.message);
      let errorMessage = 'Authentication failed';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (
        error.code === 'auth/weak-password' ||
        error.code === 'auth/invalid-password'
      ) {
        errorMessage =
          'Weak password! Password must be at least 6 characters long';
        console.log(errorMessage);
      }

      // Show Toast Message for Errors
      Toast.show({
        type: 'error',
        text1: errorMessage,
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
      });

      return rejectWithValue(errorMessage);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const user = {
        uid: response.user.uid,
        email: response.user.email,
      };
      console.log(user);

      return user;
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';

      if (error.code) {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format. Please enter a valid email.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'User not found. Please sign up first.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many login attempts. Please try again later.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Check your internet connection.';
            break;
          case 'auth/invalid-credential':
            errorMessage =
              'Invalid credentials. Please check email and password.';
            break;
          default:
            errorMessage =
              error.message || 'Login failed. Please check your credentials.';
        }
      }

      return rejectWithValue(errorMessage);
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email: string) => {
    try {
      const snapshot = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();
      if (snapshot.empty) {
        Toast.show({
          type: 'error',
          text1: 'No user found with that email address.',
          position: 'top',
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        await auth().sendPasswordResetEmail(email);
        Toast.show({
          type: 'success',
          text1: 'Password reset email sent successfully. Check your inbox.',
          position: 'top',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error: any) {
      console.log('Error sending password reset email:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to send password reset email. Please try again.',
        position: 'top',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  },
);

export const GoogleSignup = createAsyncThunk(
  'auth/GoogleSignup',
  async (_, {rejectWithValue}) => {
    try {
    
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      if (!idToken) {
        throw new Error('No ID token found');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const response = await auth().signInWithCredential(googleCredential);
      console.log('User signed in with Google', response.user);
      await firestore().collection('users').doc(response.user.uid).set({
        uid: response.user.uid,
        name: response.user.displayName,
        email: response.user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      const user = {
        uid: response.user.uid,
        email: response.user.email,
        name: response.user.displayName,
      };
      return user;
    } catch (error: any) {
      console.log('Google Sign-in Error', error);

      return rejectWithValue('Error while sign up');
    }
  },
);

export const updateName = createAsyncThunk(
  'auth/updateName',
  async (name: string, {rejectWithValue}) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');

      await user.updateProfile({ displayName: name });
      await firestore().collection('users').doc(user.uid).update({
        name: name,
      });
      return name;
    } catch (error: any) {
      console.log('Error updating name:', error);
      return rejectWithValue(error.message);
    }
  },
)

// =================================email not updated========================
export const updateEmail = createAsyncThunk(
  'auth/updateEmail',
  async (email: string, {rejectWithValue}) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');

      
      await user.sendEmailVerification();


      await user.updateEmail(email);
      await firestore().collection('users').doc(user.uid).update({
        email: email,
      });
      return email;
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        return rejectWithValue('This operation requires recent authentication. Log in again and try again.');
      }
      console.log('Error updating email:', error);
      return rejectWithValue(error.message || 'Failed to update email');
    
    }
  })

  // ======================================

  export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (
      {email, currentPassword, newPassword}:{email: string, currentPassword: string, newPassword: string},
      {rejectWithValue},
    ) => {
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          currentPassword,
        );
        const user = response.user;
        if (user) {
          const credential = auth.EmailAuthProvider.credential(
            email,
            currentPassword,
          );
          await user.reauthenticateWithCredential(credential);
          await user.updatePassword(newPassword);
          return {success: true};
        } else {
          throw new Error('User not found');
        }
      } catch (error: any) {
        console.log(error);
        if (error.code === 'auth/wrong-password' || 'auth/invalid-credential') {
           Toast.show(
            {
              type: 'error',
              text1: error.message,
              position: 'top',
              visibilityTime: 2000,
              autoHide: true,
            }
           )
        }
        return rejectWithValue(error.message);
      }
    },
  );


  export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async () => {
      const userId = auth().currentUser?.uid;
    if(!userId) {
      console.log('Error', 'User is not authenticated');
      return;
    }
    try {
      const doc = await firestore().collection('users').doc(userId).get();
      if (doc.exists) {
        return { profileImageUri: doc.data()?.profileImageUri, name: doc.data()?.name, email: doc.data()?.email};
      }
    } catch (error) {
      console.error('Error fetching image URI:', error);
    }
    
  })

  export const storeImageUriInFirestore = createAsyncThunk( 
    'auth/storeImageUriInFirestore',
    async (uri) => {
      const userId = auth().currentUser?.uid;

    try {
      await firestore()
        .collection('users') // Collection name in Firestore
        .doc(userId) // Document for the user
        .update({
          profileImageUri: uri, // Store the image URI
        });
        console.log('Image URI stored successfully');
        return uri;
    } catch (error) {
      console.error('Error storing image URI:', error);
    }
  })


export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const authuser = getAuth();
    if(authuser.currentUser){
      await auth().signOut();
    }
    return null;
  } catch (error: any) {
    console.log('Error signing out:', error);
  }
});

// ✅ Redux Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
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
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, state => {
        state.loading = true; // Set loading to true during the logout process
        state.error = null; // Reset error when starting logout
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false; // Set loading to false once logout is complete
        state.user = null; // Clear the user data (since the user is logged out)
        console.log('logout successfully');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log('Logout error:====>', action.payload);
      })
      .addCase(GoogleSignup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GoogleSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(GoogleSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateName.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.user) {
          state.user.displayName = action.payload;
        }
      })
      .addCase(updateName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(updateEmail.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.user) {
          state.user.email = action.payload;
        }
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Fetching Image URI
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImageUri = action.payload.profileImageUri;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch image URI';
      })

      // Storing Image URI
      .addCase(storeImageUriInFirestore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(storeImageUriInFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImageUri = action.payload.profileImageUri;
      })
      .addCase(storeImageUriInFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to store image URI';
      });
  },
});

// ✅ Export Reducer
export default authSlice.reducer;
