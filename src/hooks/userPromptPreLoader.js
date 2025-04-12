/**
 * node modules
 */

import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';

const usePromptPreLoader = () => {
  const navigation = useNavigation();

  const [propmptPreLoaderValue, setPropmptPreLoaderValue] = useState('');

  useEffect(() => {
    if (navigation.formData) {
      // if form data exists get the user propmt and update the preloader value
      setPropmptPreLoaderValue(navigation.formData.get('user_prompt'));
    } else {
      setPropmptPreLoaderValue('');
    }
  }, [navigation]); // run effect only when navigation state changes

  return { propmptPreLoaderValue };
};
export { usePromptPreLoader };
