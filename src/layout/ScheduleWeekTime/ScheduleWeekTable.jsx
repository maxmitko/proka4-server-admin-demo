import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Modal from 'components/Modal'
import Paginator from 'components/Paginator'
import Paper from 'components/Paper'
import Text from 'components/Text'
import { LocalesContext } from 'LocalesProvider'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator, toggleActive } from 'store/reducers/scheduleWeekTime'
import Actions from '../GridView/Actions'
import Toggle from '../GridView/Toggle'

import Table from '../GridView/Table'
import { ButtonNew, ButtonsWrapper, Label, TableWrapper } from '../GridView/Table.styled'
import EditForm from './EditForm'

const TimeListTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.scheduleWeekTime }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options )), []);
    const createItem = useCallback(data => dispatch(actionCreator.create(data)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);
    const toggleItem = useCallback(data => dispatch(toggleActive(data)), []);

    const { data, options, totalCount, loading } = useMappedState(mapState);
    const { skip, take } = options

    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState(null)
    const [initialData, setFormData] = useState({})
    const [formState, setFormState] = useState({})
    const [removeId, setDeleteId] = useState(null)
    const locales = useContext(LocalesContext)

    useEffect(() => {
        if (!data.length) fetchList({ skip, take })
    }, []);

    const handleCloseModal = () => setModal(false)

    const pageChangeHandler = itemIndex => {
        const skip = itemIndex * take
        fetchList({ skip, take })
    }

    const handleCreateClick = e => {
        e.preventDefault()

        setModal(true)
        setFormState({
            submitForm: createItem,
            header: locales.timeCreate,
            saveButton: locales.create
        })
        setFormData({})
    }

    const handleEditClick = row => e => {
        e.preventDefault()

        setModal(true)
        setFormState({
            submitForm: updateItem,
            header: locales.edit,
            saveButton: locales.save
        })
        setFormData({ ...row, title: row.title.slice(0, -3) })
    }

    const handleDeleteClick = row => e => {
        e.preventDefault()

        setDeleteId(row.id)
        setMessage(`Вы уверены что желаете удалить ${row.title.slice(0, -3)}?`)
    }

    const handleDeleteConfirm = e => {
        e.preventDefault()

        setMessage(false)
        removeItem(removeId);
    }

    const toggleActiveHandler = row => e => {
        toggleItem({ id: row.id, isActive: !row.isActive })
    }

    const columns = useCallback([
        {
            title: '№',
            render: (row, i) => skip ? i + 1 + skip : i + 1,
        },
        {
            title: 'Время',
            render: row => row.title.slice(0, -3),
        },
        {
            title: 'Активен',
            render: row =>
                <Toggle
                    isActive={row.isActive}
                    toggleActiveHandler={toggleActiveHandler(row)}
                />,
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
            <Label><Text variant="h6">{locales.time}</Text></Label>

            <TableWrapper>
                <Table
                    data={data}
                    columns={columns}
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
                    <Button onClick={handleCreateClick}>{locales.timeCreate}</Button>
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

export default TimeListTable