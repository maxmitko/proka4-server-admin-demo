import T from 'prop-types'
import React, { useState, useRef } from 'react'
import WrapperInput from './WrapperInput'
import styled from 'styled-components';
import Decoration from './Decoration'
import Label from './Label'

const TextField = React.forwardRef((props, ref) => {

    const { fixedOnTop, label, placeholder, value, onChange, color, variant, icon, arrow, labelPosition, onBlur, onFocus, noneBorder } = props
    const inputRef = useRef()
    const [isFocused, setFocused] = useState(false)


    const focusInputHandle = () => {
        setFocused(true)
        inputRef.current.focus()
        onFocus && onFocus()
    }

    const blurInputHandle = () => {
        setFocused(false)
        inputRef.current.blur()
        onBlur && onBlur()
    }

    return (
        <Wrapper {...props}>
            <Label
                labelPosition={labelPosition}
                fixedOnTop={fixedOnTop || value || placeholder || isFocused}
            >
                {label}
            </Label>
            <WrapperInput
                variant={variant}
                noneBorder={noneBorder}
                color={props.color}
                onClick={focusInputHandle}
                ref={ref}
            >
                {icon && <IconStyled>{icon}</IconStyled>}
                <Input
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={blurInputHandle}
                    ref={inputRef}
                />
                {props.children}
                {arrow && <Arrow isActive={isFocused}>{arrow}</Arrow>}
                <Decoration isActive={isFocused} color={color} variant={variant} noneBorder={noneBorder} />
            </WrapperInput>
        </Wrapper>
    )
})

export default TextField

TextField.defaultProps = {
    value: '',
    label: null,
    labelOnTop: false,
    color: 'default',
    variant: 'default',
    onChange: () => { },
};

TextField.propTypes = {
    value: T.oneOfType([
        T.string,
        T.number,
    ]),
    placeholder: T.string,
    label: T.string,
    labelAbove: T.bool,
    labelPosition: T.oneOf(['left', 'top']),
    color: T.oneOf(['default', 'white', 'primary', 'success', 'warning', 'danger', 'info', 'rose']),
    variant: T.oneOf(['default', 'outlined']),
    onChange: T.func,
};

const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;

    cursor: ${props => props.pointer ? 'pointer' : 'inherit'};

    label {
        margin-right: 0.8rem;
    }
`
const Input = styled.input`
    cursor: inherit;
    text-align: inherit;
    font-size: inherit;
    position: relative;
    background-color: transparent;
    width: 100%;
    outline: none;
    border: none;
    color: ${props => props.theme.paletteOn.surface};
    
    ::placeholder {
        color: hsla(0, 0%, 67%, 0.7);
        opacity: 1; 
    }
`

const IconStyled = styled.div`
    display: flex;
    align-self: center;
    pointer-events: none;
    margin-right: 8px;
`
const Arrow = styled.div`
    display: flex;
    align-self: center;
    pointer-events: none;
    transform: ${props => props.isActive && "rotate(180deg) translateY(10%)"};
    transition: transform 150ms linear;
`

