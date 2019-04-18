
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

const Portal = ({ children, container }) => container && ReactDOM.createPortal(children, container);

Portal.defaultProps = {
    children: null,
    container: null,
}

Portal.propTypes = {
    children: PropTypes.node,
    container: PropTypes.object,
}

export default Portal