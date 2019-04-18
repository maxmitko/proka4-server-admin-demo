import Collapse from 'components/List/Collapse';
import List from 'components/List/List';
import ListItem from 'components/List/ListItem';
import ListItemText from 'components/List/ListItemText';
import Fade from 'components/Transition/ShiftFadeOut'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components";

import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

class ListItemCollapsed extends React.PureComponent {

    state = {
        open: true,
    };

    handleGroupClick = () => {
        this.setState(state => ({ open: !state.open }));
    };
    preTextTitle = title => {
        return title.split(' ').map(item => item[0]).join('')
    }
    render() {
        const { title, icon, multilevel, match, transitionTrigger } = this.props;
        const { open } = this.state;

        return (
            <>
                <ListItem button onClick={this.handleGroupClick}>
                    {icon}
                    <Fade in={transitionTrigger}>
                        <ListItemText primary={title} />
                        <ArrowStyled rotate={+open} />
                    </Fade>
                </ListItem>
                <Collapse in={open}>
                    <List component="div">
                        {multilevel.map(({ path, title, icon }) =>
                            <Link key={path} to={path}>
                                <ListItem
                                    button
                                    selected={match.pathname === path}
                                >
                                    <PreItemText>{icon || this.preTextTitle(title)}</PreItemText>
                                    <Fade in={transitionTrigger}>
                                        <ListItemText primary={title} />
                                    </Fade>
                                </ListItem>
                            </Link>
                        )}
                    </List>
                </Collapse>
            </>
        );
    }
}

ListItemCollapsed.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
    multilevel: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        to: PropTypes.string
    })),
}

ListItemCollapsed.defaultProps = {
    title: '',
    path: '',
    multilevel: [],
};

export default ListItemCollapsed;

const ArrowStyled = styled(ArrowDropDown)`
    align-self: flex-end;
    margin-left: auto;
    transform: ${props => props.rotate ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 200ms !important;
`

const PreItemText = styled.div`
    font-family: ${props => props.theme.typography.subtitle1.fontFamily};
    text-transform: uppercase;
    font-size: calc(1rem - 0.15rem);
    text-align: center;
    min-width: 24px;
`