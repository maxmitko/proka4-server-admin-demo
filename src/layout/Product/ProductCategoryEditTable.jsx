import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Select from 'components/Select';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { fetchCategoryList } from 'store/reducers/productCategory'
import { actionCreator } from 'store/reducers/productPropsEdit'
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
    const [category, setCategory] = useState(null)
    const [deleteHandler, setDeleteHandler] = useState(null)

    const [categoryList, setCategoryList] = useState([])

    const productList = data.length && data[0]

    useEffect(() => {
        if (!productList.length) fetchList({ where: { id: productId }, relations: ["categories", "producer", "properties", "properties.type"] })
        if (!categoryList.length) (async () => {
            const result = await fetchCategoryList()
            setCategoryList(result[0])
        })()
    }, [productId]);

    const handleAddCategory = e => {
        e.preventDefault()
        const currentCategorise = productList.categories.map(item => ({ id: item.id }))
        updateItem({
            id: productList.id,
            categories: [...currentCategorise, { id: category }]
        })
    }

    const selectCategoryeHandle = e => {
        setCategory(e.target.dataset.value)
    }

    const deleteCategoryClick = row => e => {
        e.preventDefault()

        const newCategorise = productList.categories
            .map(item => ({ id: item.id }))
            .filter(item => item.id !== row.id)

        const deletHandler = () => updateItem({
            id: productList.id,
            categories: [...newCategorise]
        })

        setDeleteHandler(() => deletHandler)
        setMessage(`Вы уверены что желаете удалить ${row.title}?`)
    }

    const deleteConfirmHandle = e => {
        e.preventDefault()

        setMessage(false)
        deleteHandler();
    }

    const categoryColumns = useCallback([
        {
            title: '№',
            render: (row, i) => i + 1,
        },
        {
            title: 'Наименование',
            render: row => row.title,
        },
        {
            title: 'Описание',
            render: row => row.description,
        },
        {
            title: '',
            render: row =>
                <Actions
                    handleDeleteClick={deleteCategoryClick(row)}
                />,
        }
    ], [productList.categories])

    const categorySelectList = categoryList.length ? categoryList.map(item => ({ label: item.title, value: item.id })) : []

    return (
        <>
            <Wrapper>
                <Table
                    data={!!productList.categories ? productList.categories : []}
                    columns={categoryColumns}
                    loading={loading}
                />
            </Wrapper>
            <ButtonsWrapper>
                <Select
                    data={categorySelectList}
                    value={category}
                    placeholder="категория"
                    onChange={selectCategoryeHandle}
                    variant="outlined"
                />
                <Button
                    type="submit"
                    onClick={handleAddCategory}
                    disabled={!category}
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
