import React, { useState } from 'react'
import Select from 'components/Select'
import styled from 'styled-components'

const SelectList = props => {

    const [value, setValue] = useState('subtitle1')
    const data = [
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'button',
        'overline',
        'item1',
        'item2',
        'item3',
        'item4',
        'item5',
        'item6',
        'item7',
        'item8',
        'item9',
        'item10',
        'item11',
        'item12',
        'item13',
        'item14',
    ].map(item => ({ label: item, value: item }))

    return (
        <Wrapper>
            <Select
                label="Label"
                onChange={e => setValue(e.target.dataset.value)}
                data={data}
                value={value}
            />
            <Select
                onChange={e => setValue(e.target.dataset.value)}
                data={data}
                variant="outlined"
                value={value}
            />
        </Wrapper>
    )
}

export default SelectList

const Wrapper = styled.div`
    margin: 20px;

    > div {
        margin-bottom: 20px;
    }
`