/**
 * NODE MODULES
 */
import { redirect } from 'react-router-dom';
/**
 * CUSTOM MODULES
 */

import { account, databases } from '../../lib/appwrite';
import { Query } from 'appwrite';

const appLoader = async () => {
  const data = {};
  try {
    // attempt to retrieve the user information
    data.user = await account.get();
  } catch (err) {
    console.log(`Error getting user  session: ${err.message}`);
    return redirect('/login');
  }
  try {
    data.conversation = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversation',
      [
        Query.select(['$id', 'title']),
        Query.orderDesc('$createdAt'),
        Query.equal('user_id', data.user.$id),
      ],
    );
  } catch (err) {
    console.log(`Error getting coversation: ${err.message}`);
  }
  // if account retrieval is successful, redirect the user to the home page
  return data;
};

export default appLoader;
