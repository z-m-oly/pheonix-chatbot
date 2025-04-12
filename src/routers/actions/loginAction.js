/**
 * NODE MODULES
 */
import { redirect } from 'react-router-dom';
/**
 * CUSTOM MODULES
 */

import { account } from '../../lib/appwrite';

/**
 * HANDLE LOGIN ACTION
 */
const loginAction = async ({ request }) => {
  const formData = await request.formData();

  try {
    // attempt to create a seesion from the password and email from the form
    await account.createEmailPasswordSession(
      formData.get('email'),
      formData.get('password'),
    );
    // On Succefull login
    return redirect('/');
  } catch (err) {
    return {
      message: err.message,
    };
  }
};
export default loginAction;
