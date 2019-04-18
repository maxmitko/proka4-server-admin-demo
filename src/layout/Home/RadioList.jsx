import React, { useState } from 'react'
import Radio from 'components/Radio'
import Label from 'components/Label'
import styled from 'styled-components'


const RadioList = props => {

    const [selected, setSelected] = useState('a')

    return (
        <Wrapper>
            <Label>
                <Radio
                    disabled
                    checked={selected === 'a'}
                    onChange={() => setSelected('a')}
                />Radio первый
            </Label>
            <Label>
                <Radio
                    checked={selected === 'b'}
                    onChange={() => setSelected('b')}
                />Radio второй
            </Label>
            <Label>
                <Radio
                    checked={selected === 'c'}
                    onChange={() => setSelected('c')}
                />Radio третий
            </Label>
        </Wrapper>
    )
}

export default RadioList

const Wrapper = styled.div`
    margin: 20px;

    > label {
        margin-bottom: 20px;
    }
`