/**
 * custom module
 */

import { account } from '../lib/appwrite';

const logout = async (navigate) => {
  try {
    await account.deleteSession('current');
  } catch (err) {
    return console.log(`Error delete user sessesion ${err.message}`);
  }
  return navigate('/login');
};
export default logout;
