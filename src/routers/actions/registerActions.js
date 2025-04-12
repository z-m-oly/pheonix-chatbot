/**
 * NODE MODULES
 */
import { redirect } from 'react-router-dom';
/**
 * CUSTOM MODULES
 */

import { account } from '../../lib/appwrite';
import GenerateID from '../../utils/GenerateID';

const registerAction = async ({ request }) => {
  //retrieve the form data from the incoming request
  const formData = await request.formData();
  try {
    await account.create(
      GenerateID(),
      formData.get('email'),
      formData.get('password'),
      formData.get('name'),
    );
  } catch (err) {
    return {
      message: err.message,
    };
  }

  try {
    await account.createEmailPasswordSession(
      formData.get('email'),
      formData.get('password'),
    );
  } catch (err) {
    console.log(`Error creating a email session: ${err.message}`);
    return redirect('/login');
  }

  return redirect('/');
};

export default registerAction;
