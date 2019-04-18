import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, CarpetStyled, FilterStyled } from './styled'

const Carpet = props => {
    const { invisible, url, color, opacity } = props
    return (
        <Wrapper invisible={invisible}>
            <CarpetStyled url={url} />
            <FilterStyled color={color} opacity={opacity} />
        </Wrapper>
    )
}

Carpet.defaultProps = {
    color: null,
    invisible: false,
    url: '',
}

Carpet.propTypes = {
    color: PropTypes.oneOf(['default', 'white', 'primary', 'success', 'warning', 'danger', 'info', 'rose']),
    invisible: PropTypes.bool,
    url: PropTypes.string,
}

export default Carpet