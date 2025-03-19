import {useState} from 'react';

export function useInput(secureTextEntry: boolean | undefined) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return {
    isPasswordVisible,
    togglePasswordVisibility,
  };
}
