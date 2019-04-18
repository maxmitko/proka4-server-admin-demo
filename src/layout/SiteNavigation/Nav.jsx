import React from 'react'
import PropTypes from 'prop-types'
import List from 'components/List/List';
import Item from './NavItem'
import ItemMultilevel from './NavMultiItem'
import menuList from './menuList'
import { withRouter } from 'react-router-dom'

class NavPanel extends React.Component {
    
    render() {
        const { location, clickOnLink, transitionTrigger } = this.props

        return (
            <>
                {menuList.map(menuItem =>
                    <List key={menuItem.title} component="nav">
                        {!menuItem.multilevel
                            ? <Item {...menuItem} match={location} handleItemClick={clickOnLink} transitionTrigger={transitionTrigger}/>
                            : <ItemMultilevel {...menuItem} match={location} handleItemClick={clickOnLink} transitionTrigger={transitionTrigger}/>}
                    </List>
                )}
            </>
        );
    }
}

NavPanel.defaultProps = {
    menuList: [],
    location: {},
};

NavPanel.propTypes = {
    menuList: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        items: PropTypes.array
    })),
    location: PropTypes.shape({
        hash: PropTypes.string,
        key: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
        state: PropTypes.any
    }).isRequired
}

export default withRouter(NavPanel)