/**
 * Node modules
 */
/**
 * CUSTOM MODULES
 */

import { account, databases } from '../../lib/appwrite';
import { getConversationTitle, getAiResponse } from '../../api/googleAi';
import GenerateID from '../../utils/generateID';
import { redirect } from 'react-router-dom';

/**
 * HANDLE  incoming requests based on request_type and form data
 *
 */
const userPropmtAction = async (formData) => {
  const userPrompt = formData.get('user_prompt');
  // get current user info:
  const user = await account.get();

  // get a conversation title based on user propmt

  const conversationTitle = await getConversationTitle(userPrompt);
  let conversation = null;
  try {
    // create a new converation document in appwrite
    conversation = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversation',
      GenerateID(),
      {
        title: conversationTitle,
        user_id: user.$id,
      },
    );
  } catch (err) {
    console.log(`Error creating conversation ${err.message}`);
  }

  // geretate an Ai response based on user prompt
  const aiResponse = await getAiResponse(userPrompt);
  try {
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'chats',
      GenerateID(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversation: conversation.$id,
      },
    );
  } catch (err) {
    console.log(`Error creating chats ${err.message}`);
  }

  return redirect(`/${conversation.$id}`);
};

const conversationAction = async (formData) => {
  const conversationId = formData.get('conversation_id');
  const conversationTitle = formData.get('conversation_title');

  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversation',
      conversationId,
    );
    return { conversationTitle };
  } catch (err) {
    console.log(`Error in deleting converation: ${err.message}`);
  }
};

const appAction = async ({ request }) => {
  const formData = await request.formData();
  const requestType = formData.get('request_type');
  if (requestType === 'user_prompt') {
    return await userPropmtAction(formData);
  }
  if (requestType === 'delete_conversation') {
    return await conversationAction(formData);
  }
};
export default appAction;
