import React from 'react'
import PropTypes from 'prop-types'
import { DrawerStyled } from './styled'

const Drawer = props => {
    return (
        <DrawerStyled {...props}/>
    )
}


Drawer.defaultProps = {
    minWidth: "0px",
}

Drawer.propTypes = {
    minWidth: PropTypes.string,
}

export default Drawer