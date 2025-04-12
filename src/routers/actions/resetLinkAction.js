/**
 * CUSTOM MODULES
 */

import { account } from '../../lib/appwrite';

/**
 * HANDLE reset-link ACTION
 */
const resetLinkAction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get('email');

  try {
    // attempt to create a seesion from the password and email from the form
    await account.createRecovery(email, `${location.origin}/reset-password`);

    return {
      ok: true,
      message:
        'you will recieve a password reset link shortly. please check your email address and follow the instruction to reset your password',
    };
  } catch (err) {
    console.log(`Error getting the password reset link: ${err.message}`);
    return {
      ok: false,
      message: err.message,
    };
  }
};
export default resetLinkAction;
