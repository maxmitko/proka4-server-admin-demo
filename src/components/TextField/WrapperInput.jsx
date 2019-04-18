import styled, { css } from 'styled-components';

const base = css`
    position: relative;
    margin: 0;
    padding: 0;
    border: 0;
    min-width: 0;
    display: inline-flex;
    font-family: ${props => props.theme.typography.subtitle2.fontFamily};
    font-size: ${props => props.theme.typography.subtitle2.fontSize}rem;
    width: 100%;
    height: 32px;

`
const variant = {
    default: css`
        color: ${props => props.theme.paletteOn.surface};
        border-bottom: 1px solid;
        border-color: hsl(0, 0%, 67%);;
        height: 28px;
    `,

    outlined: css`
        cursor: pointer;
        color: ${props => props.theme.paletteOn.surface};
        height: 2.5rem;
        box-sizing: border-box;
        border: 1px solid;
        border-radius: 0.2rem;
        padding-left: 8px;
        border-color: ${props => props.theme.extra[props.color]};

        input {
            cursor: pointer;
        }
    `
}

const noneBorder = css`
    border: none;
`

export default styled.div`
    ${base}
    ${props => variant[props.variant]}
    ${props => props.noneBorder && noneBorder}
`