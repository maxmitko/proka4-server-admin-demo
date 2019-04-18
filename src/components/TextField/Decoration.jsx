import styled, { css } from 'styled-components';


const variant = {
    default: css`
        border-bottom: 1px solid hsl(0, 0%, 67%);

        ::after {
            content: "";
            left: 0;
            right: 0;
            bottom: -1px;
            position: absolute;
            pointer-events: none;
            border-bottom: 2px solid ${ props => props.theme.extra[props.color]};
            transform: ${ props => props.isActive ? "scaleX(1)" : "scaleX(0)"};
            transition-property: transform;
            transition: 200ms;
            pointer-events: none;
        }
    `,
    outlined: null
}

export default styled.div`
    ${props => variant[props.variant]}
`