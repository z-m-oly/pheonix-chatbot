/**
 * node modules
 */

import PropTypes from 'prop-types';
/**
 * custom modules
 */
import UserPrompt from './UserPrompt';
import AiResponse from './AiResponse';
import Skeleton from './Skeleton';

function PromptPreLoader({ propmtValue }) {
  return (
    <div className='max-w-[700px] mx-auto'>
      <UserPrompt text={propmtValue} />

      <AiResponse>
        <Skeleton />
      </AiResponse>
    </div>
  );
}

PromptPreLoader.propTypes = {
  propmtValue: PropTypes.string,
};

export default PromptPreLoader;
