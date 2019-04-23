import T from 'prop-types'
import React, { useCallback } from 'react'
import styled, { css } from 'styled-components';
import Text from 'components/Text'
import Body from './Body'
import Loader from './Loader'
import Spinner from "components/SvgLoaders"

const GridView = props => {

    const { data, columns, onRowClick, loading, defaultRow } = props

    return (
        <Wrapper >
            <LoaderStyled loading={loading}><Spinner /></LoaderStyled>
            {!data.length && !loading && <VoidBody><Text variant="body1">Записи отсутствуют</Text></VoidBody>}
            <TableStyled>
                {!!data.length &&
                    <thead>
                        <tr>
                            {columns.map(item =>
                                <td key={item.title} style={item.style}>{item.title}</td>)}
                        </tr>
                    </thead>}
                <Body
                    data={data}
                    columns={useCallback(columns, [data])}
                    defaultRow={defaultRow}
                    onRowClick={onRowClick}
                />
            </TableStyled>
        </Wrapper>
    )
}

GridView.defaultProps = {
    loading: false,
}

GridView.propTypes = {
    loading: T.bool,
}

export default GridView

const Wrapper = styled.div`
    position: relative;
`

const baseTd = css`
    padding: 12px 8px;
    position: relative;
    border-bottom: none;
    vertical-align: middle;
    font-weight: 300;
`
const base = css`
    width: 100%;
    border-collapse: collapse;
    position: relative;
    
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
`

const blur = css`
    color: transparent;
    text-shadow: 0 0 9px rgba(0,0,0,0.5);
`

const TableStyled = styled.table`
    ${base}
    ${props => props.blur && blur}
`

const LoaderStyled = styled(Loader)`
    fill: ${props => props.theme.extra.default};
    position: absolute;
    width: 80px;
    transform: translate(-50%, -50%);
    top: 0%;
    left: 50%;
    z-index: 1;
`

const VoidBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`
