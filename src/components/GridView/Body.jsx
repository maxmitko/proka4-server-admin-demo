import T from 'prop-types'
import React, { useState } from 'react'
import styled, { css } from 'styled-components';

const Body = React.forwardRef((props, ref) => {

    const { data, columns, onRowClick, defaultRow } = props

    const [activeRow, setActiveRow] = useState(defaultRow)

    const rowClickHandle = (row, i) => e => {
        if (onRowClick) {
            setActiveRow(i)
            onRowClick(row, i)
        }
    }

    return (
        <tbody ref={ref}>
            {data.map((row, rowIndex) =>
                <RowStyled
                    key={row.id}
                    onClick={rowClickHandle(row, rowIndex)}
                    active={rowIndex === activeRow}
                    hovered={onRowClick}
                >
                    {columns.map(item =>
                        <td key={item.title + row.id} style={item.style}>
                            {item.render(row, rowIndex)}
                        </td>)}
                </RowStyled>)}
        </tbody >
    )
})

Body.defaultProps = {
    data: [],
    columns: [],
    onRowClick: null,
    defaultRow: null,
}

Body.propTypes = {
    loading: T.bool,
    defaultRow: T.number,
    columns: T.array,
    data: T.array,
    onRowClick: T.func,
}

export default React.memo(Body)


const active = css`
    background-color: hsl(258, 49%, 93%);
`

const hoveredRow = css`
    cursor: pointer;
    
    :hover {
        background-color: hsl(258, 49%, 93%);
    }
`
const RowStyled = styled.tr`

    ${props => props.active && active}
    ${props => props.hovered && hoveredRow}
`