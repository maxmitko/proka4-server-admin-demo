import ListItem from 'components/List/ListItem';
import ListItemText from 'components/List/ListItemText';
import Fade from 'components/Transition/ShiftFadeOut'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

class Item extends React.PureComponent {

    render() {
        const { title, path, icon, match, transitionTrigger } = this.props;

        return (
            <Link key={path} to={path}>
                <ListItem
                    button
                    selected={match.pathname === path}
                >
                    {icon}
                    <Fade in={transitionTrigger}>
                        <ListItemText primary={title} />
                    </Fade>
                </ListItem>
            </Link>
        );
    }
}

Item.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
}

Item.defaultProps = {
    title: '',
    path: '',
};

export default Item;
