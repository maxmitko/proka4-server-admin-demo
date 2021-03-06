import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Paginator from 'components/Paginator'
import Paper from 'components/Paper'
import Text from 'components/Text'
import { LocalesContext } from 'LocalesProvider'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/productPropertyType'
import Modal from 'components/Modal'
import Actions from 'components/GridView/Actions'

import Table from 'components/GridView/Table'
import { ButtonNew, ButtonsWrapper, Label, TableWrapper } from 'components/GridView/Table.styled'
import EditForm from './EditForm'

const PropertyTypeTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.productPropertyType }), [])
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
        if (!data.length) fetchList({ skip, take })
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
            header: locales.create,
            saveButton: locales.create
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
            title: 'Наименование',
            render: row => row.title,
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
            <Label><Text variant="h6">Тип свойства</Text></Label>

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
                    <Button onClick={handleCreateClick}>Добавить тип</Button>
                </ButtonNew>
            </ButtonsWrapper>

            <Modal isOpen={modal} onClose={handleCloseModal} overlay top="200px">
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

export default PropertyTypeTable