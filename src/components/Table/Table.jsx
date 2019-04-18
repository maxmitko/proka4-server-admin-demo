import PropTypes from "prop-types";
import React from 'react'
import styled, { css } from 'styled-components';

const Table = props => {

    return (
        <TableStyled>
            {props.children}
        </TableStyled>
    )
}

Table.propTypes = {
    children: PropTypes.array,
};

Table.defaultProps = {
    children: [],
};

export default Table

const baseTd = css`
    padding: 12px 8px;
    position: relative;
    border-bottom: none;
    vertical-align: middle;
    font-weight: 300;
`
export const TableStyled = styled.table`
  
    width: 100%;
    border-collapse: collapse;
    
    thead td {
        ${baseTd}
        font-size: ${props => props.theme.typography.body1.fontSize}rem;
        font-family: ${props => props.theme.typography.body1.fontFamily};
        line-height:  ${props => props.theme.typography.body1.lineHeight};
    }

    tbody td {
        ${baseTd}
        font-size: ${props => props.theme.typography.body2.fontSize}rem;
        font-family: ${props => props.theme.typography.body2.fontFamily};
        line-height:  ${props => props.theme.typography.body2.lineHeight};
        border-top: 1px solid #ddd;
    }
`;