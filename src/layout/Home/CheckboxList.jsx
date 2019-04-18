import React, { useState, useCallback } from 'react'
import Checkbox from 'components/Checkbox'
import Label from 'components/Label'
import styled from 'styled-components'

const CheckboxList = props => {

    const [form, setValues] = useState({
        a: true,
        b: false,
        c: false,
        d: false,
        e: true,
    });

    const [a, setA] = useState()
    const [b, setB] = useState()

    const updateField = name => () =>
        setValues(state => ({
            ...form,
            [name]: !state[name]
        }))


    const doubleSetHandle = () => {
        setB(state => !state)
        setA(state => !state)
        setB(state => !state)
    }

    return (
        <Wrapper>
            <Label>
                <Checkbox
                    disabled
                    checked={form.a}
                    onChange={updateField("a")}
                />Первый
            </Label>
            <Label>
                <Checkbox
                    checked={form.b}
                    onChange={updateField("b")}
                />Второй пошел
            </Label>
            <Label>
                <Checkbox
                    checked={form.c}
                    onChange={updateField("c")}
                />Третий
            </Label>
            <Label>
                <Checkbox
                    checked={form.d}
                    onChange={updateField("d")}
                    variant="toggle"
                />Toggle
            </Label>
            <Label>
                <Checkbox
                    checked={form.e}
                    onChange={updateField("e")}
                    variant="toggle"
                />Toggle
            </Label>
            <Label>
                <Checkbox
                    checked={a}
                    onChange={useCallback(doubleSetHandle, [a])}
                    variant="toggle"
                />Toggle
            </Label>
            <Label>
                <Checkbox
                    checked={b}
                    onChange={useCallback(doubleSetHandle, [b])}
                    variant="toggle"
                />Toggle
            </Label>
        </Wrapper>
    )
}

export default CheckboxList

const Wrapper = styled.div`
    margin: 20px;

    > label {
        margin-bottom: 20px;
    }
`