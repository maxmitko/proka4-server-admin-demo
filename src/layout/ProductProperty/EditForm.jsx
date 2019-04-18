import Paper from 'components/Paper'
import Text from 'components/Text'
import React, { useCallback, useState, useEffect } from 'react'
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';
import { fetchPropertyTypeList } from 'store/reducers/productPropertyType'
import Select from 'components/Select';
import Label from 'components/TextField/Label'

import { ButtonsWrapper, FieldsWrapper, FormStyled, HeaderBadgeStyled, SaveButton } from '../Form/index'

const ProductPropertyForm = props => {

    const mapState = useCallback(state => ({ loading: state.productProperty.crud.loading }), [])

    const { loading } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [state, setState] = useState(initialData);

    const [propertyType, setPropertyType] = useState(initialData.type && initialData.type.id)
    const [propertyTypeList, setPropertyTypeList] = useState([])

    useEffect(() => {
        if (!propertyTypeList.length) (async () => {
            const result = await fetchPropertyTypeList()
            setPropertyTypeList(result[0])
        })()
    }, [])

    const onChangeField = name => e => {
        setState({
            ...state,
            [name]: e.target.value,
        })
    };

    const selectTypeHandle = e => {
        setPropertyType(e.target.dataset.value)
    }

    const handleSubmitForm = e => {
        e.preventDefault()
        formState.submitForm({...state, type: propertyType})
    }

    const { description } = state
    const propertyTypeSelectList = propertyTypeList.length ? propertyTypeList.map(item => ({ label: item.title, value: item.id })) : []

    return (

        <Wrapper>
            <HeaderBadgeStyled><Text variant="h6" color="primary" >{formState.header}</Text></HeaderBadgeStyled>
            <FormStyled onSubmit={handleSubmitForm}>
                <FieldsWrapper>
                    <ContentWrapper >
                        <Label labelPosition="left">Услуга</Label>
                        <Select
                            data={propertyTypeSelectList}
                            value={propertyType}
                            placeholder="Тип"
                            onChange={selectTypeHandle}
                            variant="outlined"
                        />
                    </ContentWrapper >
                    <Description >
                        <Label labelPosition="left">Описание</Label>
                        <textarea
                            value={description}
                            onChange={onChangeField('description')}
                        />
                    </Description>
                </FieldsWrapper>
                <ButtonsWrapper>
                    <SaveButton type="submit" color="success" spinned={loading}>{formState.saveButton}</SaveButton>
                </ButtonsWrapper>
            </FormStyled>
        </Wrapper >
    )
}

export default ProductPropertyForm

const Wrapper = styled(Paper)`
    padding: 0 30px 20px 25px;
    height: 100%;
    min-width: 500px;
`

const ContentWrapper = styled.div`
    display: flex;
    margin-top: 40px;

    > div {
        flex-grow: 1;
    }

    label {
        min-width: 140px;
        margin-right: 30px;
        align-self: center;
        justify-content: flex-end;
    }
`

const Description = styled(ContentWrapper)`
    label {
        align-self: flex-start;
    }
    textarea {
        width: 100%;
        min-height: 140px;
        border-radius: 0.2rem;
        padding-left: 6px;
    }
`