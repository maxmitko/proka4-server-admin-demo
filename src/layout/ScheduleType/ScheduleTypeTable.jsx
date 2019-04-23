import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Modal from 'components/Modal'
import Paginator from 'components/Paginator'
import Paper from 'components/Paper'
import Text from 'components/Text'
import { LocalesContext } from 'LocalesProvider'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator, toggleActive } from 'store/reducers/scheduleType'
import styled from 'styled-components';
import Actions from 'components/GridView/Actions'
import Toggle from 'components/GridView/Toggle'

import Table from 'components/GridView/Table'
import { ButtonNew, ButtonsWrapper, TableWrapper } from 'components/GridView/Table.styled'
import EditForm from './EditForm'

const ScheduleTypeTable = props => {
    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.scheduleType }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);
    const createItem = useCallback(data => dispatch(actionCreator.create(data)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const toggleItem = useCallback(data => dispatch(toggleActive(data)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);

    const { data, totalCount, loading, options } = useMappedState(mapState);
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
            header: locales.groupCreate,
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
        setFormData(row)
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

    const toggleActiveHandler = row => e => {
        toggleItem({ ...row, isActive: !row.isActive })
    }

    const columns = useCallback([
        {
            title: '№',
            render: (row, i) => skip ? i + 1 + skip : i + 1,
        },
        {
            title: 'Название',
            render: row => row.title,
        },
        {
            title: 'Активен',
            render: row => <Toggle
                isActive={row.isActive}
                toggleActiveHandler={toggleActiveHandler(row)}
            />,
        },
        {
            title: '',
            render: row => <Actions
                isActive={row.isActive}
                handleEditClick={handleEditClick(row)}
                handleDeleteClick={handleDeleteClick(row)}
            />,
        }
    ], [data])

    return (
        <Paper>
            <Label><Text variant="h6">Группировка расписаний</Text></Label>

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
                    <Button onClick={handleCreateClick}>{locales.groupCreate}</Button>
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

export default ScheduleTypeTable

const Label = styled.div`
    margin: 15px 0;
`