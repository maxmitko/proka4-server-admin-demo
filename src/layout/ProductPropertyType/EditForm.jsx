import Paper from 'components/Paper'
import Text from 'components/Text'
import TextField from 'components/TextField'
import React, { useCallback, useState } from 'react'
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';

import { ButtonsWrapper, FieldsWrapper, FormStyled, HeaderBadgeStyled, SaveButton } from '../Form/index'

const PropertyTypeForm = props => {

    const mapState = useCallback(state => ({ loading: state.productPropertyType.crud.loading }), [])

    const { loading } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);

    const onChangeField = name => e => {
        setState({
            ...state,
            [name]: e.target.value,
        })
    };

    const handleSubmitForm = e => {
        e.preventDefault()
        formState.submitForm(state)
    }

    const { title } = state

    return (

        <Wrapper>
            <HeaderBadgeStyled><Text variant="h6" color="primary" >{formState.header}</Text></HeaderBadgeStyled>
            <FormStyled onSubmit={handleSubmitForm}>
                <FieldsWrapper>
                    <TextField
                        value={title}
                        onChange={onChangeField('title')}
                        label="Наименование"
                        labelPosition="left"
                    />
                </FieldsWrapper>
                <ButtonsWrapper>
                    <SaveButton type="submit" color="success" spinned={loading}>{formState.saveButton}</SaveButton>
                </ButtonsWrapper>
            </FormStyled>
        </Wrapper>
    )
}

export default PropertyTypeForm

const Wrapper = styled(Paper)`
    padding: 0 30px 20px 25px;
    height: 100%;
    min-width: 430px;
`