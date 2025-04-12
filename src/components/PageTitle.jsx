/**
 * node modules
 *
 */
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const PageTitle = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
  );
};

export default PageTitle;

PageTitle.propTypes = {
  title: PropTypes.string,
};
