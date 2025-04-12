/**
 *
 * node modules
 */
import PropTypes from 'prop-types';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

/**
 *
 * custom modules
 */

import { useToggle } from '../hooks/useToggle';
/**
 *
 * components
 */
import Avatar from './Avatar';
import { IconBtn } from './Button';

function UserPrompt({ text }) {
  const { user } = useLoaderData();
  const [isExpanded, toggleExpanded] = useToggle();
  const textBoxRef = useRef();

  const [hasMoreContent, SetHasMoreContent] = useState(false);

  useEffect(() => {
    SetHasMoreContent(
      textBoxRef.current.scrollHeight > textBoxRef.current.clientHeight,
    );
  }, [textBoxRef]);
  return (
    <div className='grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-5'>
      <Avatar name={user?.name} />
      <p
        className={`text-bodyLarge pt-1 whitespace-pre-wrap ${!isExpanded ? 'line-clamp-4' : ''} `}
        ref={textBoxRef}
      >
        {text}
      </p>
      {hasMoreContent && (
        <IconBtn
          icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          onClick={toggleExpanded}
          title={isExpanded ? 'collapse text' : 'Exapand text'}
        />
      )}
    </div>
  );
}
UserPrompt.propTypes = {
  text: PropTypes.string,
};
export default UserPrompt;
