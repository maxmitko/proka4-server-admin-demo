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
import { actionCreator } from 'store/reducers/appointment'

import Assignment from '@material-ui/icons/Assignment'

import Actions from 'components/GridView/Actions'
import Table from 'components/GridView/Table'
import { ButtonNew, ButtonsWrapper, Label, TableWrapper } from 'components/GridView/Table.styled'
import EditForm from './AppointmentEditForm'

const AppointmentTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.appointment }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);
    const createItem = useCallback(data => dispatch(actionCreator.create(data)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);

    const { data, options, totalCount, loading } = useMappedState(mapState);
    const { skip, take } = options

    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState(null)
    const [initialData, setFormData] = useState({})
    const [formState, setFormState] = useState({})
    const [removeId, setDeleteId] = useState(null)
    const locales = useContext(LocalesContext)

    useEffect(() => {
        if (!data.length) fetchList()
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
            header: locales.appointmentCreate,
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
        setMessage(`Вы уверены что желаете удалить ${row.id}?`)
    }

    const handleDeleteConfirm = e => {
        e.preventDefault()

        setMessage(false)
        removeItem(removeId);
    }

    const statusList = [
        { value: 0, label: 'выполнено' },
        { value: 1, label: 'активна' },
    ]

    const columns = useCallback([
        {
            title: 'ID',
            render: row => row.id,
        },
        {
            title: 'Имя',
            render: row => row.name,

        },
        {
            title: 'Телефон',
            render: row => row.phone,
        },
        {
            title: 'Комментарий',
            render: row => row.comment,
        },
        {
            title: 'Статус',
            render: row => statusList.find(item => item.value === row.status).label,
        },
        {
            title: '',
            render: row => <Actions
                handleEditClick={handleEditClick(row)}
                handleDeleteClick={handleDeleteClick(row)}
            />,
        }
    ], [data])

    return (
        <Paper>
            <HeaderBadge float="left"><Assignment /></HeaderBadge>
            <Label><Text variant="h6">{locales.appointment}</Text></Label>

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
                    <Button onClick={handleCreateClick}>{locales.appointmentCreate}</Button>
                </ButtonNew>
            </ButtonsWrapper>

            <Modal isOpen={modal} onClose={handleCloseModal} overlay top="200px">
                <EditForm
                    initialData={initialData}
                    formState={formState}
                    statusList={statusList}
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

export default AppointmentTable