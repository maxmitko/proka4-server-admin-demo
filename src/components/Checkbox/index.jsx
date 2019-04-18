import React from 'react'
import T from 'prop-types'
import Checkbox from './Checkbox'
import Toggle from './Toggle'

const Switch = props => {
    
    const variants = {
        checkbox: Checkbox,
        toggle: Toggle,
    }

    const Component = variants[props.variant]

    return <Component {...props} />
}

Switch.defaultProps = {
    disabled: false,
    color: 'default',
    variant: 'checkbox',
    checked: false
}

Switch.propTypes = {
    checked: T.bool,
    disabled: T.bool,
    color: T.oneOf(['default', 'white', 'primary', 'success', 'warning', 'danger', 'info', 'rose']),
    variant: T.oneOf(['checkbox', 'toggle']),
}

export default Switch