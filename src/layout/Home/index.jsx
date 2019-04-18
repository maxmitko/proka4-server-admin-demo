import React from 'react'
import Buttons from './Buttons'
import CheckboxList from './CheckboxList'
import RadioList from './RadioList'
import TextList from './TextList'
import TextFields from './TextFields'
import SelectList from './SelectList'
import styled from 'styled-components'

const Home = props => {

    return (
        <>
            <Buttons />
            <FieldsList>
                <CheckboxList />
                <RadioList />
                <TextFields />
                <SelectList />
            </FieldsList>
            <TextList />
        </>
    )
}

export default Home

const FieldsList = styled.div`
    display: flex;
`