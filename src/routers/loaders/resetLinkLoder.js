/**
 * NODE MODULES
 */
import { redirect } from 'react-router-dom';
/**
 * CUSTOM MODULES
 */

import { account } from '../../lib/appwrite';

const resetLinkLoader = async () => {
  try {
    // attempt to retrieve the user information
    await account.get();
  } catch (err) {
    console.log(`Error getting user  session: ${err.message}`);
    return null;
  }
  // if account retrieval is successful, redirect the user to the home page
  return redirect('/');
};

export default resetLinkLoader;
