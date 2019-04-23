import HeaderBadge from 'components/Badge/Header'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Modal from 'components/Modal'
import Paginator from 'components/Paginator'
import Paper from 'components/Paper'
import Text from 'components/Text'
import { LocalesContext } from 'LocalesProvider'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/product'

import Assignment from '@material-ui/icons/Assignment'

import Actions from 'components/GridView/Actions'
import Table from 'components/GridView/Table'
import { ButtonNew, ButtonsWrapper, Label, TableWrapper } from 'components/GridView/Table.styled'
import EditForm from './ProductEditForm'

const ProductListTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.product }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);
    const createItem = useCallback(data => dispatch(actionCreator.create(data)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);

    const { data, options, totalCount, loading } = useMappedState(mapState);
    const { skip, take } = options

    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState(null)
    const [formState, setFormState] = useState({})
    const [initialData, setFormData] = useState({})
    const [removeId, setDeleteId] = useState(null)
    const locales = useContext(LocalesContext)

    useEffect(() => {
        if (!data.length) fetchList({ skip, take, relations: ['categories', 'properties', 'properties.type'], order: { id: "ASC" } })
    }, []);

    const handleCloseModal = () => {
        setModal(false)
    }

    const pageChangeHandler = itemIndex => {
        const skip = itemIndex * take
        fetchList({ skip, take })
    }

    const handleCreateClick = e => {
        e.preventDefault()

        setModal(true)
        setFormState({
            submitForm: createItem,
            header: locales.productCreate,
            saveButton: locales.productCreate
        })
        setFormData({})
    }

    const handleEditClick = row => e => {
        e.preventDefault()

        setModal(true)
        setFormData(row)
        setFormState({
            submitForm: updateItem,
            header: locales.edit,
            saveButton: locales.save,
        })
    }

    const handleDeleteClick = row => e => {
        e.preventDefault()

        setDeleteId(row.id)
        setMessage(`Вы уверены что желаете удалить ${row.title}?`)
    }

    const handleDeleteConfirm = e => {
        e.preventDefault()

        setMessage(false)
        removeItem(removeId);
    }

    const productColumns = useCallback([
        {
            title: '№',
            render: (row, i) => skip ? i + 1 + skip : i + 1,
        },
        {
            title: 'Название',
            render: row => row.title,
        },
        {
            title: 'Описание',
            render: row => row.description.slice(0, 100) + "...",
            style: { maxWidth: '200px' }
        },
        {
            title: 'Категория',
            render: row => row.categories && row.categories.map(item => item.title).join(', '),
            style: { maxWidth: '200px', textAlign: 'center' }
        },
        {
            title: 'Свойства',
            render: row => row.properties && row.properties.map(item => item.type.title).join(', '),
            style: { maxWidth: '200px', textAlign: 'center' }
        },
        {
            title: 'Стоимость',
            render: row => row.price,
            style: { textAlign: 'center' }
        },
        {
            title: 'В наличии',
            render: row => !!row.inStock ? 'да' : 'нет',
            style: { textAlign: 'center' }
        },
        {
            title: 'Количество',
            render: row => row.count,
            style: { textAlign: 'center' }
        },
        {
            title: 'Картинка',
            render: row => <img src={`${process.env.REACT_APP_SERVER_URL}/images/catalog/product/${row.image}`} height="50px" alt={row.image} />,
            style: { textAlign: 'center' }
        },
        {
            title: '',
            render: row =>
                <Actions
                    handleEditClick={handleEditClick(row)}
                    handleDeleteClick={handleDeleteClick(row)}
                />,
        }
    ], [data])

    return (
        <Paper>
            <HeaderBadge float="left"><Assignment /></HeaderBadge>
            <Label><Text variant="h6">{locales.product}</Text></Label>

            <TableWrapper>
                <Table
                    data={data}
                    columns={productColumns}
                    loading={loading}
                />
            </TableWrapper>

            <ButtonsWrapper>
                <Paginator
                    totalRecords={totalCount}
                    defaultPage={skip / take}
                    pageLimit={take}
                    pageNeighbours={2}
                    onPageChanged={useCallback(pageChangeHandler, [])}
                />
                <ButtonNew>
                    <Button onClick={handleCreateClick}>{locales.productCreate}</Button>
                </ButtonNew>
            </ButtonsWrapper>

            <Modal isOpen={modal} onClose={handleCloseModal} overlay top="150px">
                <EditForm
                    initialData={initialData}
                    formState={formState}
                />
            </Modal>

            <Dialog
                open={!!message}
                onClose={() => setMessage(false)}
                onConfirm={handleDeleteConfirm}
            >
                {message}
            </Dialog>
        </Paper>
    )
}

export default ProductListTable