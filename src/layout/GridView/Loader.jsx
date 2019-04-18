import T from 'prop-types'
import React, { useState, useEffect } from 'react'
import Spinner from "components/SvgLoaders"
import Fade from 'components/Transition/Fade'

const Loader = props => {

    const { loading, delay, children } = props

    const [loader, setLoader] = useState(null)

    useEffect(() => {

        const id = setTimeout((loading) => {
            loading
                ? setLoader(children || <Spinner variant="threedots" />)
                : setLoader(null)
        }, delay, loading)

        return () => clearTimeout(id)

    }, [loading])

    return <div className={props.className}><Fade in={!!loading && !!loader}>{loader}</Fade></div>
}

Loader.defaultProps = {
    loading: undefined,
    delay: 400,
}

Loader.propTypes = {
    loading: T.bool,
    delay: T.number,
}

export default Loader