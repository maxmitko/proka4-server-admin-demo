import T from 'prop-types'
import React from 'react'
import { ButtonStyled } from './styled'
import Ripples from 'react-touch-ripple'
import styled from 'styled-components'
// import Spinner from "components/SvgLoaders/index"

const Button = props => {
    const { children } = props

    return (
        <ButtonStyled {...props}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
            <StyledRipples />
        </ButtonStyled>
    )
}


Button.defaultProps = {
    variant: 'contained',
    color: 'default',
    size: 'medium',
    round: false,
    colorBase: 'extraOn',
    spinned: null,
};

Button.propTypes = {
    variant: T.oneOf(['text', 'outlined', 'contained']),
    color: T.oneOf(['default', 'gray', 'white', 'primary', 'success', 'warning', 'danger', 'info', 'rose']),
    size: T.oneOf(['small', 'medium', 'large']),
    fullWidth: T.bool,
    round: T.bool,
    colorBase: T.string,
    visibilyty: T.string,
    spinned: T.bool,
};

export default React.memo(Button)

const StyledRipples = styled(Ripples)`
    position: absolute !important;
    border-radius: inherit;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

// const SpinnerStyled = styled(Spinner)`
//     display: ${props => props.spinned ? 'flex' : 'none'};
//     position: absolute;
//     min-width: calc(100% / 4 + 10px);
//     flex-direction: column;
//     align-self: center;
//     justify-content: center;
// `

const ChildrenWrapper = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
`