import React from 'react'
import { BoxStyled } from './styled'
import T from 'prop-types'

const Box = props => <BoxStyled {...props} />

Box.defaultProps = {
    item: false,
    container: false,
};

Box.propTypes = {
    item: T.bool,
    container: T.bool,
};

export default Box
