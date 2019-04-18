import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Modal from 'components/Modal'
import Select from 'components/Select';
import { LocalesContext } from 'LocalesProvider'
import moment from 'moment'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/userCard'
import { fetchTicketList } from 'store/reducers/ticket'
import styled from 'styled-components'

import FitnessCenter from '@material-ui/icons/FitnessCenter'

import EditForm from '../ClientCard/EditForm'
import Actions from '../GridView/Actions'
import Table from '../GridView/Table'
import { ButtonsWrapper } from '../Users/EditForm'

const UserCardTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.userCard }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);
    const createItem = useCallback(data => dispatch(actionCreator.create(data)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);

    const { data, loading } = useMappedState(mapState);
    const { userId } = props

    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState(null)
    const [initialData, setFormData] = useState({})
    const [removeId, setDeleteId] = useState(null)
    const [ticket, setTicket] = useState()
    const [ticketList, setTicketList] = useState([])
    const [formState, setFormState] = useState(null)
    const locales = useContext(LocalesContext)

    useEffect(() => {
        fetchList({ user: userId })
        if (!ticketList.length) (async () => {
            const result = await fetchTicketList({ relations: ["service"] })
            setTicketList(result[0])
        })()
    }, []);

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
        setMessage(`Вы уверены что желаете удалить ${row.user.fullname} ${row.service.title}?`)
    }

    const handleDeleteConfirm = e => {
        e.preventDefault()

        setMessage(false)
        removeItem(removeId);
    }

    const selectServiceHandle = e => {
        setTicket(e.target.dataset.value)
    }

    const createItemHandle = e => {

        const { count, price, service } = ticketList.filter(item => item.id === Number(ticket))[0]

        createItem({
            service: service.id,
            user: userId,
            count,
            price
        })
    }

    const cardColumns = useCallback([
        {
            title: '№',
            render: (row, i) => i + 1,
            style: { textAlign: 'center' }
        },
        {
            title: 'Курс',
            render: row => row.service.title,
        },
        {
            title: 'Стоимость',
            render: row => row.price,
            style: { textAlign: 'center' }
        },
        {
            title: 'Долг',
            render: row => row.debt,
            style: { textAlign: 'center' }
        },
        {
            title: 'Квота',
            render: row => row.count,
            style: { textAlign: 'center' }
        },
        {
            title: 'Остаток',
            render: row => {
                const visited = row.visits.length && row.visits.filter(item => item.visitStatus === 1)
                return visited.length ? row.count - visited.length : row.count
            },
            style: { textAlign: 'center' }
        },
        {
            title: 'Дата покупки',
            render: row => moment(row.purchaseTime).format('DD-MM-YYYY'),
            style: { textAlign: 'center' }
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

    const ticketSelectList = ticketList.length ? ticketList.map(item => ({ label: item.title, value: item.id })) : []

    return (
        <>
            <TableWrapper>
                <Table
                    data={data}
                    columns={cardColumns}
                    loading={loading}
                />
            </TableWrapper>

            <ButtonsWrapper>
                <Select
                    data={ticketSelectList}
                    value={ticket}
                    placeholder="Выбирите абонимент"
                    onChange={selectServiceHandle}
                    variant="outlined"
                    icon={<FitnessCenter />}
                />
                <Button
                    type="submit"
                    spinned={loading}
                    onClick={createItemHandle}
                    disabled={!ticket}
                >Добавить</Button>
            </ButtonsWrapper>
            <Modal isOpen={modal} onClose={() => setModal(false)} overlay top="200px">
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
        </>
    )
}

export default UserCardTable

const TableWrapper = styled.div`
    min-height: 400px;
`