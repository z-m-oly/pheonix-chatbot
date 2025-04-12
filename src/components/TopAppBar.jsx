/**
 *
 * NODE MODULES
 */
import {
  //   Link,
  useNavigation,
  useNavigate,
  useLoaderData,
  useParams,
  useSubmit,
} from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import PropTypes from 'prop-types';

// /**
//  * Assets
//  */
// import { assets } from '../assets/assets';
/**
 * Custom hooks
 */
import { useToggle } from '../hooks/useToggle';

/**
 * custom modules
 */

import logout from '../utils/logout';

/**
 *
 * Components
 */

import { IconBtn } from './Button';
import Avatar from './Avatar';
import Menu from './menu';
import MenuItem from './MenuItem';
import { LinearProgress } from './Progress';
import Logo from './Logo';

/**
 *
 * custom mudules
 */
import deleteConversation from '../utils/deleteConversation';

function TopAppBar({ toggleSidebar }) {
  // use navigation provides navigation state like (loading, submitting)
  const navigation = useNavigation();

  // useNavigate a function thet switche between routes programatically
  const navigate = useNavigate();

  //user: user datafor the currently logged in user
  const { conversation, user } = useLoaderData();

  // params Object containingurl parameters including the converstsionId
  const params = useParams();

  // Obtain the useSubmit hook for handling form submitions
  const submit = useSubmit();

  const [showMenu, setShowMenu] = useToggle();

  //check is the current navigation state is loading and no form data is associated with naviagation
  // condition signifys normal page load

  const isNormalLoad = navigation.state === 'loading' && !navigation.formData;
  return (
    <header className='relative flex justify-between items-center h-16 px-4'>
      <div className='flex items-center gap-1'>
        <IconBtn
          icon='menu'
          title='Menu'
          classes='lg:hidden'
          onClick={toggleSidebar}
        />

        <Logo classes='lg:hidden' />
      </div>

      {params.conversationId && (
        <IconBtn
          icon='delete'
          classes='ms-auto me-1 lg:hidden '
          onClick={() => {
            // find the current conversation title
            const { title } = conversation.documents.find(
              ({ $id }) => params.conversationId === $id,
            );
            deleteConversation({
              id: params.conversationId,
              title,
              submit,
            });
          }}
        />
      )}
      <div className='menu-wrapper'>
        <IconBtn onClick={setShowMenu}>
          <Avatar name={user.name} />
        </IconBtn>
        <Menu classes={showMenu ? 'active' : ''}>
          <MenuItem
            onClick={() => {
              logout(navigate);
            }}
            labelText='logout'
          />
        </Menu>
      </div>

      {isNormalLoad && (
        <AnimatePresence>
          <LinearProgress classes='absolute  top-full left-0 right-0 z-10 ' />
        </AnimatePresence>
      )}
    </header>
  );
}
TopAppBar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
};
export default TopAppBar;
