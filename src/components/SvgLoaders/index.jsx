import React from 'react'
import ThreeDots from './ThreeDots'
import Puff from './Puff'
import Oval from './Oval'
import T from 'prop-types'

const Spinner = React.forwardRef((props, ref) => {

    const components = {
        threedots: ThreeDots,
        puff: Puff,
        oval: Oval,
    };

    const TagName = components[props.variant];

    return <TagName ref={ref} className={props.className} {...props}/>
})

Spinner.defaultProps = {
    variant: 'threedots',
}

Spinner.propTypes = {
    variant: T.oneOf(['threedots', 'puff', 'oval']),
}

export default Spinner