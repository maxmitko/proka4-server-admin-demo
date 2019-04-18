import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Select from 'components/Select';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/productPropsEdit'
import { fetchPropertyList } from 'store/reducers/productProperty'
import { fetchPropertyTypeList } from 'store/reducers/productPropertyType'
import styled from 'styled-components'

import Actions from '../GridView/Actions'
import Table from '../GridView/Table'

const ProductListTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.productPropsEdit }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const { productId } = props

    const { data, loading } = useMappedState(mapState);

    const [message, setMessage] = useState(null)
    const [property, setProperty] = useState(null)
    const [propertyType, setPropertyType] = useState(null)
    const [deleteHandler, setDeleteHandler] = useState(null)

    const [propertyList, setPropertyList] = useState([])
    const [propertyTypeList, setPropertyTypeList] = useState([])

    const productList = data.length && data[0]

    useEffect(() => {
        if (!productList.length) fetchList({ where: { id: productId }, relations: ["categories", "producer", "properties", "properties.type"] })
        if (!propertyTypeList.length) (async () => {
            const result = await fetchPropertyTypeList()
            setPropertyTypeList(result[0])
        })()
    }, [productId]);

    const handleAddProperty = e => {
        e.preventDefault()
        e.preventDefault()
        const currentProperty = productList.properties.map(item => ({ id: item.id }))
        updateItem({
            id: productList.id,
            properties: [...currentProperty, { id: property }]
        })
    }

    const selectPropertyTypeHandle = async e => {
        setPropertyType(e.target.dataset.value)
        setProperty(null)
        const list = await fetchPropertyList({ where: { type: e.target.dataset.value } })

        setPropertyList(list[0])
    }

    const selectPropertyHandle = e => {
        setProperty(e.target.dataset.value)
    }

    const deletePropertyClick = row => e => {
        e.preventDefault()

        const newProps = productList.properties
            .map(item => ({ id: item.id }))
            .filter(item => item.id !== row.id)

        const deletHandler = () => updateItem({
            id: productList.id,
            properties: [...newProps]
        })

        setDeleteHandler(() => deletHandler)
        setMessage(`Вы уверены что желаете удалить ${row.title}?`)
    }

    const deleteConfirmHandle = e => {
        e.preventDefault()

        setMessage(false)
        deleteHandler();
    }

    const propsColumns = useCallback([
        {
            title: '№',
            render: (row, i) => i + 1,
        },
        {
            title: 'Наименование',
            render: row => row.type.title,
        },
        {
            title: 'Описание',
            render: row => row.description,
        },
        {
            title: '',
            render: row =>
                <Actions
                    handleDeleteClick={deletePropertyClick(row)}
                />,
        }
    ], [productList.properties])

    const propertySelectList = propertyList.length ? propertyList.map(item => ({ label: item.description, value: item.id })) : []
    const propertyTypeSelectList = propertyTypeList.length ? propertyTypeList.map(item => ({ label: item.title, value: item.id })) : []

    return (
        <>
            <Wrapper>
                <Table
                    data={!!productList.properties ? productList.properties : []}
                    columns={propsColumns}
                    loading={loading}
                />
            </Wrapper>
            <ButtonsWrapper>
                <Select
                    data={propertyTypeSelectList}
                    value={propertyType}
                    placeholder="тип"
                    onChange={selectPropertyTypeHandle}
                    variant="outlined"
                />
                <Select
                    data={propertySelectList}
                    value={property}
                    placeholder="свойство"
                    onChange={selectPropertyHandle}
                    variant="outlined"
                />
                <Button
                    type="submit"
                    onClick={handleAddProperty}
                    disabled={!property}
                >Добавить</Button>
            </ButtonsWrapper>
            <Dialog
                open={!!message}
                onClose={() => setMessage(false)}
                onConfirm={deleteConfirmHandle}
            >
                {message}
            </Dialog>
        </>
    )
}

export default ProductListTable

const Wrapper = styled.div`
    min-height: 400px;
`

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 15px 0;

    > * {
        margin-left: 20px;
    }
`
