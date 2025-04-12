/**
 * NODE MODULES
 */
import { redirect } from 'react-router-dom';
/**
 * CUSTOM MODULES
 */

import { account } from '../../lib/appwrite';

/**
 * HANDLE Reset-password ACTION
 */
const resetPasswordAction = async ({ request }) => {
  const formData = await request.formData();
  const url = new URL(request.url);

  const password = formData.get('password');

  try {
    await account.updateRecovery(
      url.searchParams.get('userId'),
      url.searchParams.get('secret'),
      password,
    );

    return redirect('/login');
  } catch (err) {
    console.log(`Error updating the password : ${err.message}`);
    return {
      message: err.message,
    };
  }
};
export default resetPasswordAction;
