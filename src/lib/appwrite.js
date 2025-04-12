/**
 * NODE MODULES
 */
import { Client, Account, Databases, Avatars } from 'appwrite';

/**
 * INITIAL APPWRITE CLIENT
 */

const client = new Client();
client
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  .setEndpoint('https://cloud.appwrite.io/v1');

/**
 * INITIAL APPWIRTE AVATARS
 */
const account = new Account(client);

const avatar = new Avatars(client);
const databases = new Databases(client);

export { account, databases, avatar };
