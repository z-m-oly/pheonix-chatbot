/**
 * Node modules
 */
import { useRouteError, Link } from 'react-router-dom';

function ConversationError() {
  // retrieve the error object associated with the current route, if any
  const error = useRouteError();
  return (
    <div className='grid grid-cols-1 justify-items-center content-center h-full'>
      <p className='text-displayMedium font-semibold'>{error.code}</p>

      <p className='text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-2 mb-4'>
        {error.message}
      </p>

      <Link
        className='btn filled primary'
        to='/'
      >
        Create a New chat
        <div className='state-layer'></div>
      </Link>
    </div>
  );
}

export default ConversationError;
