import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import T from 'prop-types'
import Add from '@material-ui/icons/Add'
import Spinner from "components/SvgLoaders"

const ColorBox = props => {

    const { color, onClick } = props
    const [hovered, setHovered] = useState()
    const [loader, setLoader] = useState(null)

    useEffect(() => {
        setLoader(null)
    }, [onClick])

    const boxClickHandle = e => {
        setLoader(<Loader><Spinner variant="oval" width={27} height={27} stroke="#e91e63" strokeWidth={4} /></Loader>)
        onClick(e)
    }

    return (
        <Wrapper onClick={boxClickHandle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {loader}
            {!!color
                ? <Box hovered={hovered} color={color} />
                : <Plus hovered={hovered}><Add /></Plus>
            }
        </Wrapper>
    )
}

export default ColorBox

ColorBox.defaultProps = {
    color: ''
}

ColorBox.propTypes = {
    color: T.string
}

const Wrapper = styled.div`
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0;
`


const Box = styled.div`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${props => props.hovered ? "red" : props.color};
`

const Loader = styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const Plus = styled.div`
    display: ${props => props.hovered ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.extra.success};
`