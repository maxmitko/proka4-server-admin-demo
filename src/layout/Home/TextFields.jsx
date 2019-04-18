import React, { useState } from 'react'
import TextField from 'components/TextField'
import styled from 'styled-components'

const TextFieldList = props => {

    const [fieldList, setFieldList] = useState({})

    const setFieldHandler = name => e => {
        setFieldList({ ...fieldList, [name]: e.target.value })
    }

    return (
        <Wrapper>
            <TextField onChange={setFieldHandler("a1")} value={fieldList.a1} label="Label" /><br /><br />
            <TextField onChange={setFieldHandler("a2")} value={fieldList.a2} label="Label" placeholder="placeholder" /><br /><br />
            <TextField onChange={setFieldHandler("a3")} value="value" label="Label" /><br /><br />
            <TextField onChange={setFieldHandler("a4")} value={fieldList.a4} label="Label left" labelPosition="left" /><br /><br />
            <TextField onChange={setFieldHandler("a5")} value={fieldList.a5} label="Label fixedtop" fixedOnTop /><br /><br />
        </Wrapper>
    )
}

export default TextFieldList

const Wrapper = styled.div`
    margin: 20px;

`