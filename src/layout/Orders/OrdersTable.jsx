import HeaderBadge from 'components/Badge/Header'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Modal from 'components/Modal'
import Paginator from 'components/Paginator'
import Paper from 'components/Paper'
import Text from 'components/Text'
import { LocalesContext } from 'LocalesProvider'
import moment from 'moment'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/orders'

import Assignment from '@material-ui/icons/Assignment'

import Actions from '../GridView/Actions'
import Table from '../GridView/Table'
import { ButtonNew, ButtonsWrapper, Label, TableWrapper } from '../GridView/Table.styled'
import EditForm from './OrdersEditForm'
import InfoTable from './OrdersInfoTable'

const OrdersTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.orders }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);
    const createItem = useCallback(data => dispatch(actionCreator.create(data)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);

    const { data, options, totalCount, loading } = useMappedState(mapState);
    const { skip, take } = options

    const [modal, setModal] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)
    const [message, setMessage] = useState(null)
    const [initialData, setFormData] = useState({})
    const [formState, setFormState] = useState({})
    const [removeId, setDeleteId] = useState(null)
    const locales = useContext(LocalesContext)

    useEffect(() => {
        if (!data.length) fetchList()
    }, []);

    const pageChangeHandler = itemIndex => {
        const skip = itemIndex * take
        fetchList({ skip, take })
    }

    const handleCreateClick = e => {
        e.preventDefault()

        setModal(true)
        setFormState({
            submitForm: createItem,
            header: locales.ordersCreate,
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

    const handleInfoClick = row => e => {
        e.preventDefault()
        setFormData(row)
        setModalInfo(true)
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
        { value: 0, label: 'выполнен' },
        { value: 1, label: 'активен' },
        { value: 2, label: 'отменен пользователем' },
    ]

    const columns = useCallback([
        {
            title: 'ID',
            render: row => row.id,
        },
        {
            title: 'Имя в заявке',
            render: row => row.customer,
        },
        {
            title: 'Зарегестрирован под именем',
            render: row => row.user && row.user.username,
            style: { maxWidth: '55px' },
        },
        {
            title: 'Добавлено',
            render: row => row.timeAdd && moment(row.timeAdd).format('DD-MM-YYYY'),
            style: { textAlign: 'center' },
        },
        {
            title: 'Телефон',
            render: row => row.phone,
            style: { textAlign: 'center' },
        },
        {
            title: 'Завершен',
            render: row => (row.timeDone && moment(row.timeDone).format('DD-MM-YYYY')) || 'нет',
            style: { textAlign: 'center' },
        },
        {
            title: 'Статус',
            render: row => statusList.find(item => item.value === row.status).label,
            style: { textAlign: 'center' },
        },
        {
            title: '',
            render: row => <Actions
                handleEditClick={handleEditClick(row)}
                handleDeleteClick={handleDeleteClick(row)}
                handleInfoClick={handleInfoClick(row)}
            />,
        }
    ], [data])

    return (
        <Paper>
            <HeaderBadge float="left"><Assignment /></HeaderBadge>
            <Label><Text variant="h6">{locales.orders}</Text></Label>

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
                    <Button onClick={handleCreateClick}>{locales.ordersCreate}</Button>
                </ButtonNew>
            </ButtonsWrapper>

            <Modal isOpen={modal} onClose={() => setModal(false)} overlay top="200px">
                <EditForm
                    initialData={initialData}
                    formState={formState}
                    statusList={statusList}
                />
            </Modal>

            <Modal isOpen={modalInfo} onClose={() => setModalInfo(false)} overlay top="200px">
                <InfoTable
                    initialData={initialData}
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

export default OrdersTable