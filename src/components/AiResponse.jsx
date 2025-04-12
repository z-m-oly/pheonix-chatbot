/**
 *
 * node modules
 */
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { hopscotch, coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

/**
 *
 * hooks
 */
import { useSnackbar } from '../hooks/useSnackbar';
/**
 *
 * custom modules
 */
import toTittleCase from '../utils/toTittleCase';
/**
 *
 * componenets
 */
import { assets } from '../assets/assets';
import { IconBtn } from './Button';
import { useEffect } from 'react';
import { useCallback } from 'react';

function AiResponse({ aiResponse, children }) {
  const [codeTheme, setCodeTheme] = useState('');
  const { showSnackbar, hideSnackbar } = useSnackbar();

  // useEffect detect to detect changes in the users preffered color scheme
  useEffect(() => {
    // create mediaquery to detect user prefferd color scheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setCodeTheme(mediaQuery.matches ? hopscotch : coy);

    // Create an eventListener to handle changes in the prefered color scheme

    const themeListener = mediaQuery.addEventListener('change', (event) => {
      setCodeTheme(event.matches ? hopscotch : coy);
    });
    // CleanUp function to remeove the event listener when the component un mounds
    return () => mediaQuery.removeEventListener('change', themeListener);
  }, []);

  const handleCopy = useCallback(
    async (text) => {
      hideSnackbar();
      try {
        await navigator.clipboard.writeText(text);
        showSnackbar({ message: 'copied to clipboard', timeOut: 2500 });
      } catch (err) {
        showSnackbar({
          message: err.message,
        });
        console.log(`Error copying the text to clipboard ${err.message}`);
      }
    },
    [showSnackbar, hideSnackbar],
  );

  // function executes for every code tag
  const code = ({ children, className, ...rest }) => {
    const match = className?.match(/language-(\w+)/);
    return match ? (
      <>
        <div className='code-block'>
          <div className='p-4 pb-0, font-sans'>{toTittleCase(match[1])}</div>
          <SyntaxHighlighter
            {...rest}
            PreTag='div'
            language={match[1]}
            style={codeTheme}
            customStyle={{
              marginBlock: '0',
              padding: '2px',
            }}
            codeTagProps={{
              style: {
                padding: '14px',
                fontWeight: '600',
              },
            }}
          >
            {children}
          </SyntaxHighlighter>
        </div>
        <div className='bg-light-surfaceContainer dark:bg-dark-surfaceContainer rounded-t-extraSmall rounded-b-medium flex justify-between items-center h-11 font-sans text-bodyMedium ps-4 pe-2'>
          <p>
            Use code
            <a
              href='https://gemini.google.com/faq#coding'
              target='_blank'
              className='link ms-2'
            >
              With Caution
            </a>
          </p>

          <IconBtn
            icon='content_copy'
            size='small'
            title='Copy Code'
            onClick={handleCopy.bind(null, children)}
          />
        </div>
      </>
    ) : (
      <code className={className}>{children}</code>
    );
  };
  return (
    <div className='grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr)] md:gap-5'>
      <figure className='w-8 h-8 grid place-items-center'>
        <img
          src={assets.logoIcon}
          width={32}
          height={32}
          alt='pheonix logo'
        />
      </figure>
      {children}

      {aiResponse && (
        <div className='markdown-content'>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{ code }}
          >
            {aiResponse}
          </Markdown>
        </div>
      )}
    </div>
  );
}
AiResponse.propTypes = {
  aiResponse: PropTypes.string,
  children: PropTypes.any,
};

export default AiResponse;
