/**
 * node modules
 */

import PropTypes from 'prop-types';

import { avatar } from '../lib/appwrite';

function Avatar({ name }) {
  return (
    <figure className='avatar'>
      <img
        src={avatar.getInitials(name, 48, 48)}
        alt={name}
        width={48}
        height={48}
      />
    </figure>
  );
}
Avatar.propTypes = {
  name: PropTypes.string,
};

export default Avatar;
