/**
 *
 * node modules
 */
import { redirect } from 'react-router-dom';

/**
 *
 * custom modules
 */
import { account, databases } from '../../lib/appwrite';

const conversationLoader = async ({ params }) => {
  const { conversationId } = params;
  const data = {};
  try {
    data.user = await account.get();
  } catch (err) {
    console.log(`Error grtting a user account ${err.message}`);
    // if error getting the user, log  it and redirect the user

    return redirect('/login');
  }

  try {
    data.conversation = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversation',
      conversationId,
    );
  } catch (err) {
    console.log(`Error grtting conversation ${err.message}`);
    throw err;
  }
  return data;
};
export default conversationLoader;
