/**
 * NODE MODULES
 */
import { redirect } from 'react-router-dom';
/**
 * CUSTOM MODULES
 */

import { account } from '../../lib/appwrite';

const resetPasswordLoader = async ({ request }) => {
  const url = new URL(request.url);
  try {
    // attempt to retrieve the user information
    await account.get();
    // if account retrieval is successful, redirect the user to the home page
    return redirect('/');
  } catch (err) {
    console.log(`Error getting user  session: ${err.message}`);
    // return null;
  }
  if (!url.searchParams.get('userId') && !url.searchParams.get('secret')) {
    return redirect('/reset-link');
  }
  return null;
};

export default resetPasswordLoader;
