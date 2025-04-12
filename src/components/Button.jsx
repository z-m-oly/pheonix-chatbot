/**
 * node modules
 */

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
/**
 * common button
 */
const Button = ({
  children,
  classes,
  variant = 'filled',
  color = 'primary',
  ...rest
}) => {
  return (
    <button
      className={`btn ${variant} ${color} ${classes}`}
      {...rest}
    >
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
};

const IconBtn = ({ children, classes = '', size = '', icon, ...rest }) => {
  return (
    <motion.button
      className={`icon-btn ${size} ${classes}`}
      {...rest}
    >
      {children}
      {!children && (
        <span className={`material-symbols-rounded icon`}>{icon}</span>
      )}
      <div className='state-layer'></div>
    </motion.button>
  );
};

IconBtn.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
};

/**
 * Extended Fab
 */
const ExtendedFab = ({ href, classes = '', text, ...rest }) => {
  return (
    <Link
      to={href}
      className={`extended-fab ${classes}`}
      {...rest}
    >
      <span className='material-symbols-rounded'>add</span>

      <span className='trubcate'>{text}</span>

      <div className='state-layer'></div>
    </Link>
  );
};
ExtendedFab.propTypes = {
  classes: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
};

export { Button, IconBtn, ExtendedFab };
