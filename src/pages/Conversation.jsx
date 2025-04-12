/**
 *
 *  node modules
 */
import { motion } from 'motion/react';
import { useLoaderData, useLocation } from 'react-router-dom';
/**
 *
 *  custom hooks
 */

import { usePromptPreLoader } from '../hooks/userPromptPreLoader';
/**
 *
 *  components
 */
import PageTitle from '../components/PageTitle';
import UserPrompt from '../components/UserPrompt';
import AiResponse from '../components/AiResponse';
import PromptPreLoader from '../components/PromptPreLoader';

function Conversation() {
  //Extarct the  conversation data from the loader(chat and title)

  const { propmptPreLoaderValue } = usePromptPreLoader();

  // Obtain the current Url location information using the use useLocation

  const location = useLocation();
  const {
    conversation: { title, chats },
  } = useLoaderData() || {};
  return (
    <>
      {/* meta title */}
      <PageTitle title={`${title} | Pheonix`} />
      <motion.div
        className='max-w-[700px] mx-auto !will-change-auto'
        initial={!location.state?._isRedirect && { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05, ease: 'easeOut' }}
      >
        {chats.map((chat) => (
          <div key={chat.$id}>
            {/* user prompt */}
            <UserPrompt text={chat.user_prompt} />

            {/* ai response */}
            <AiResponse aiResponse={chat.ai_response} />
          </div>
        ))}
      </motion.div>
      {propmptPreLoaderValue && (
        <PromptPreLoader propmtValue={propmptPreLoaderValue} />
      )}
    </>
  );
}

export default Conversation;
