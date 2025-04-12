/**
 * node modules
 */

import PropTypes from 'prop-types';

function MenuItem({ classes = '', labelText, ...rest }) {
  return (
    <button
      className={`menu-item ${classes}`}
      {...rest}
    >
      <span>{labelText}</span>
      <div className='state-layer'></div>
    </button>
  );
}

MenuItem.propTypes = {
  classes: PropTypes.string,
  labelText: PropTypes.string,
};

export default MenuItem;
