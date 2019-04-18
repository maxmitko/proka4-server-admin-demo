import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components';

const Text = props => <TextStyled {...props} />

Text.defaultProps = {
    variant: 'body1',
    color: 'surface',
    align: 'inherit',
    colorBase: 'paletteOn',
};

Text.propTypes = {
    variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline', 'inherit']),
    color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'background', 'surface', 'error']),
    align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
    tag: PropTypes.string,
    colorBase: PropTypes.oneOf(['paletteOn', 'palette']),
};

export default Text

const base = css`
	margin: 0;
	font-family: ${props => props.theme.typography[props.variant].fontFamily};
	font-size: ${props => props.theme.typography[props.variant].fontSize}rem;
	font-weight: ${props => props.theme.typography[props.variant].fontWeight};
	letter-spacing: ${props => props.theme.typography[props.variant].letterSpacing}px;
	line-height: ${props => props.theme.typography[props.variant].lineHeight};
	color: ${props => props.theme[props.colorBase][props.color]};
	text-align: ${props => props.align};
`

export const TextStyled = styled.span.attrs(props => ({
	as: props.tag || props.theme.typography[props.variant].tag,
}))`
	${base}
`;
