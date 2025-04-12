/**
 *
 * node modules
 */
import PropTypes from 'prop-types';

const TextField = ({
  classes,
  placeholder,
  helperText,
  name,
  label,
  fieldClasses,
  ...rest
}) => {
  return (
    <div className={`text-field-wrapper ${classes || ''}`}>
      <label
        htmlFor={name}
        className='label-text'
      >
        {label}
      </label>
      <input
        className={`text-field ${fieldClasses || ''}`}
        id={name}
        name={name}
        placeholder={placeholder || ''}
        {...rest}
      />
      {helperText && <p className='helper-text'>{helperText}</p>}
    </div>
  );
};

export default TextField;

TextField.propTypes = {
  classes: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  fieldClasses: PropTypes.string,
};
