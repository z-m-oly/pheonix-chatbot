/**
 * NODE MODULES
 */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
/**
 *
 * ASSETS
 */
import { assets } from '../assets/assets';

function Logo({ classes = '' }) {
  return (
    <Link
      to='/'
      className={`min-w-max max-w-max h-[24px] ${classes}`}
    >
      <img
        src={assets.logoLight}
        width={133}
        height={24}
        alt='Phoenix-logo'
        className='dark:hidden'
      />
      <img
        src={assets.logoDark}
        width={133}
        height={24}
        alt='Phoenix-logo'
        className='hidden dark:block'
      />
    </Link>
  );
}
Logo.propTypes = {
  classes: PropTypes.string,
};

export default Logo;
