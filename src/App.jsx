/**
 * node modules
 */
import { motion } from 'motion/react';
import {
  Outlet,
  useParams,
  useNavigation,
  useActionData,
} from 'react-router-dom';
import { useEffect, useRef } from 'react';
/**
 * custom hooks
 */
import { useToggle } from './hooks/useToggle';
import { useSnackbar } from './hooks/useSnackbar';
import { usePromptPreLoader } from './hooks/userPromptPreLoader';
/**
 * components
 */
import PageTitle from './components/PageTitle';
import Sidebar from './components/Sidebar';
import TopAppBar from './components/TopAppBar';
import Greatings from './pages/Greatings';
import PropmtField from './components/PropmtField';

function App() {
  // get Url parameters
  const params = useParams();

  const navigation = useNavigation();

  // get the data passed from the formAction
  const actionData = useActionData();

  // create e refernce to an html element likely used to interact with the chat history
  const chatHistoryRef = useRef();

  const { showSnackbar } = useSnackbar();

  //access propmt preloader state perticularly the value for propmt preloading
  const { propmptPreLoaderValue } = usePromptPreLoader();

  // useEffect hook is triggered whenever the `promptPreLoaderValue` or `chatHistoryRef` changes
  //Inside the hook we get the current html elemnt referenced by the `chatHistoryRef`
  useEffect(() => {
    const chatHistory = chatHistoryRef.current;
    if (propmptPreLoaderValue) {
      chatHistory.scroll({
        top: chatHistory.scrollHeight - chatHistory.clientHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistoryRef, propmptPreLoaderValue]);

  useEffect(() => {
    if (actionData?.conversationTitle) {
      showSnackbar({
        message: `Deleted '${actionData.conversationTitle}' conversation`,
      });
    }
  }, [actionData, showSnackbar]);

  //use custom hook to manage sidebar open state
  const [isSidebarOpen, toggleSidebar] = useToggle();

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;

  return (
    <>
      {/* meta title */}
      <PageTitle title={'pheonix - chat to supercharge your ideas'} />

      <div className='lg:grid lg:grid-cols-[320px,1fr]'>
        {/* sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <div className='h-dvh grid grid-rows-[max-content,minmax(0,1fr),max-content]'>
          {/* top app bar */}
          <TopAppBar toggleSidebar={toggleSidebar} />

          {/* main content */}
          <div
            ref={chatHistoryRef}
            className='px-5 pb-5 flex flex-col overflow-y-auto '
          >
            <div className='max-w-[840px] w-full mx-auto grow'>
              {isNormalLoad ? null : params.conversationId ? (
                <Outlet /> // conversation
              ) : (
                <Greatings />
              )}
            </div>
          </div>

          {/* prompt field */}
          <div className='bg-light-background dark:bg-dark-background'>
            <div className='max-w-[870px] px-5 w-full mx-auto'>
              <PropmtField />

              <motion.p
                initial={{ opacity: 0, translateY: '-4px' }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.2, delay: 0.8, ease: 'easeOut' }}
                className='text-bodySmall text-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant p-3'
              >
                Pheonix might display in accurate information including about
                people, so double-check its responses.
                <a
                  href='https://support.google.com/gemini/answer/13594961?visit_id=638692573323164258-3392699128&p=privacy_help&rd=1'
                  target='_blank'
                  className='inline underline ms-1'
                >
                  Your privacy & gemini Apps
                </a>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
