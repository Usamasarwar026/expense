import { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';

export default function useMainNavigation() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsAuthenticated(user ? true : false);
    });

    return () => unsubscribe();
  }, []);
  return {isAuthenticated}
}
