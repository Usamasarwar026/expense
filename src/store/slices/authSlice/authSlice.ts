import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {FirebaseError} from 'firebase/app';
import {
  GoogleSignin,
  SignInResponse,
} from '@react-native-google-signin/google-signin';
import {AuthState, AuthUser} from '../../../types/types';
import {uploadToCloudinary} from '../imageSlice/imageSlice';
import {showToast} from '../../../utils/toastUtils';

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    {name, email, password}: {name: string; email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = response.user;

      await firestore().collection('users').doc(user.uid).set({
        uid: user?.uid,
        name: name,
        email: user?.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return {uid: user.uid, name: name, email: user.email};
    } catch (error) {
      const typedError = error as FirebaseError;
      console.error(
        'Firebase Auth Error:',
        typedError.code,
        typedError.message,
      );
      let errorMessage = 'Authentication failed';

      if (typedError.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use';
      } else if (typedError.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (
        typedError.code === 'auth/weak-password' ||
        typedError.code === 'auth/invalid-password'
      ) {
        errorMessage =
          'Weak password! Password must be at least 6 characters long';
        console.error(errorMessage);
      }
      showToast({
        type: 'error',
        message: errorMessage,
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
        uid: response?.user?.uid,
        email: response?.user?.email,
      };

      return user;
    } catch (error) {
      const typedError = error as FirebaseError;
      let errorMessage = 'Login failed. Please try again.';

      if (typedError.code) {
        switch (typedError.code) {
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
              typedError.message ||
              'Login failed. Please check your credentials.';
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
        showToast({
          type: 'error',
          message: 'No user found with that email address.',
        })
      } else {
        await auth().sendPasswordResetEmail(email);
        showToast({
          message: 'Password reset email sent successfully. Check your inbox.',
        })
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      showToast({
        type: 'error',
        message: 'Failed to send password reset email. Please try again.',
      })
    }
  },
);

export const GoogleSignup = createAsyncThunk(
  'auth/GoogleSignup',
  async (_, {rejectWithValue}) => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const responses: SignInResponse = await GoogleSignin.signIn();

      if ('idToken' in responses) {
        const {idToken} = responses;
        const token: string = idToken as string;
        if (!token) {
          throw new Error('No ID token found');
        }
        const googleCredential = auth.GoogleAuthProvider.credential(token);
        const response = await auth().signInWithCredential(googleCredential);
        await firestore().collection('users').doc(response.user.uid).set({
          uid: response?.user?.uid,
          name: response?.user?.displayName,
          email: response?.user?.email,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        const user = {
          uid: response?.user?.uid,
          email: response?.user?.email,
          name: response?.user?.displayName,
        };
        return user;
      } else {
        throw new Error('Google sign-in was canceled or failed.');
      }
    } catch (error) {
      const typedError = error as Error;
      console.error('Google Sign-in Error', error);

      return rejectWithValue(typedError.message);
    }
  },
);

export const updateName = createAsyncThunk(
  'auth/updateName',
  async (name: string, {rejectWithValue}) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');

      await user.updateProfile({displayName: name});
      await firestore().collection('users').doc(user.uid).update({
        name: name,
      });
      return name;
    } catch (error) {
      const typedError = error as Error;
      console.error('Error updating name:', error);
      return rejectWithValue(typedError.message);
    }
  },
);

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
    } catch (error) {
      const typedError = error as FirebaseError;
      if (typedError.code === 'auth/requires-recent-login') {
        return rejectWithValue(
          'This operation requires recent authentication. Log in again and try again.',
        );
      }
      return rejectWithValue(typedError.message || 'Failed to update email');
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    {
      email,
      currentPassword,
      newPassword,
    }: {email: string; currentPassword: string; newPassword: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        email,
        currentPassword,
      );
      const user = response?.user;
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
    } catch (error) {
      const typedError = error as FirebaseError;
      console.error(error);
      if (
        typedError.code === 'auth/wrong-password' ||
        'auth/invalid-credential'
      ) {
        showToast({
          type: 'error',
          message: typedError.message,
        })
      }
      return rejectWithValue(typedError.message);
    }
  },
);

export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async () => {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      return;
    }
    try {
      const doc = await firestore().collection('users').doc(userId).get();
      if (doc.exists) {
        return {
          profileImageUri: doc.data()?.profileImageUri,
          name: doc.data()?.name,
          email: doc.data()?.email,
        };
      }
    } catch (error) {
      console.error('Error fetching image URI:', error);
    }
  },
);

export const storeImageUriInFirestore = createAsyncThunk<
  {profileImageUri: string},
  string,
  {rejectValue: string}
>('auth/storeImageUriInFirestore', async (uri, {dispatch, rejectWithValue}) => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    return rejectWithValue('User not authenticated');
  }

  try {
    let uploadedImageUrl = uri;
    if (uri) {
      const result = await dispatch(uploadToCloudinary(uri)).unwrap();
      uploadedImageUrl = result;
    }
    await firestore().collection('users').doc(userId).update({
      profileImageUri: uploadedImageUrl,
    });
    return {profileImageUri: uri};
  } catch (error) {
    const typedError = error as Error;
    console.error('Error storing image URI:', error);
    return rejectWithValue(typedError.message);
  }
});

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, {rejectWithValue}) => {
    try {
      const user = auth()?.currentUser;
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      await auth().signOut();
      return true;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError.message);
    }
  },
);

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  status: 'idle',
  isAuthenticated: true,
  usersData: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as AuthUser;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as AuthUser;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(GoogleSignup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GoogleSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as AuthUser;
      })
      .addCase(GoogleSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateName.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.user) {
          (state.user as any).displayName = action.payload;
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
      .addCase(fetchUserData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.usersData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch image URI';
      })
      .addCase(storeImageUriInFirestore.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(storeImageUriInFirestore.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImageUri = action.payload.profileImageUri;
      })
      .addCase(storeImageUriInFirestore.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to store image URI';
      })
      .addCase(logout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;
