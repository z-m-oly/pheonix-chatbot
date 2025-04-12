/**
 * node modules
 */

import PropTypes from 'prop-types';

function Menu({ classes = '', children }) {
  return <div className={`menu ${classes}`}>{children}</div>;
}

Menu.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.string,
};

export default Menu;
