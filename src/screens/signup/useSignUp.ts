import {useAppDispatch} from '../../hooks/useRedux';
import {GoogleSignup, signup} from '../../store/slices/authSlice/authSlice';
import {navigate} from '../../navigation/navigationRef/navigationRef';
import {useState} from 'react';
import {showToast} from '../../utils/toastUtils';

export default function useSignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const dispatch = useAppDispatch();

  const goToLogin = () => {
    navigate('Login');
  };
  const goToLandingPage = () => {
    try {
      navigate('LaunchScreen');
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  const signupfunction = async () => {
    try {
      if (!name || !email || !password) {
        showToast({
          type: 'error',
          message: 'Please fill in all fields',
        });
        return;
      }
      if (!isChecked) {
        showToast({
          type: 'error',
          message: 'Please Accept the Terms and Privacy Policy.',
        });
        return;
      }
      if (password.length < 6) {
        showToast({
          type: 'error',
          message: 'Password must be at least 6 characters long.',
        });
        return;
      }

      const resultAction = await dispatch(signup({name, email, password}));
      if (signup.fulfilled.match(resultAction)) {
        navigate('Login');

        setTimeout(() => {
          showToast({
            message: 'Signup Successful!',
            description: 'You can now log in to your account.',
          });
        }, 1500);

        setName('');
        setEmail('');
        setPassword('');
      } else {
        const errorMessage =
          resultAction.payload || 'Signup failed, please try again.';
        showToast({
          type: 'error',
          message: errorMessage as string,
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Signup failed, please try again.',
      });
    }
  };

  const dispatchGoogleSignIn = async () => {
    try {
      const resultAction = await dispatch(GoogleSignup());
      if (GoogleSignup.fulfilled.match(resultAction)) {
        showToast({
          message: 'Google Sign-In Successful!',
        });
        navigate('Home');
      } else {
        const errorMessage =
          resultAction.payload || 'Something went wrong! Please try again.';
        showToast({
          type: 'error',
          message: 'Google Sign-In Failed!',
          description: errorMessage as string | 'please try again',
        });
      }
    } catch (error) {
      const typedError = error as Error;
      console.error('Google Sign-In Error:', error);
      showToast({
        type: 'error',
        message: 'Google Sign-In Failed! please try again',
        description: typedError.message || 'An unexpected error occurred.',
      });
    }
  };
  return {
    goToLandingPage,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    isChecked,
    setChecked,
    signupfunction,
    dispatchGoogleSignIn,
    goToLogin,
  };
}
