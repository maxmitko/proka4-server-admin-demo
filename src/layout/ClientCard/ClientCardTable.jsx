import Dialog from 'components/Dialog'
import Modal from 'components/Modal'
import Select from 'components/Select'
import Text from 'components/Text'
import { LocalesContext } from 'LocalesProvider'
import moment from 'moment'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator, selectDefautStatus, selectStatus } from 'store/reducers/clientCard'

import statusList from '../ClientRegistration/statusList'
import Actions from '../GridView/Actions'
import Table from '../GridView/Table'
import EditForm from './EditForm'

const ClientCardTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.clientCard }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);

    const { data, options, loading, defaultStatus } = useMappedState(mapState);
    const { skip, take } = options

    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState(null)
    const [formState, setFormState] = useState(null)
    const [initialData, setFormData] = useState({})
    const [removeId, setDeleteId] = useState(null)
    const locales = useContext(LocalesContext)

    useEffect(() => {
        if (!data.length) fetchList({ skip, take })
    }, []);

    const handleCloseModal = () => setModal(false)

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

    const selectStatusHandle = useCallback(index => e => {
        dispatch(selectStatus(index, Number(e.target.dataset.value)))
    }, [])

    const selectDefautStatusHandle = useCallback(e => {
        const value = e.target.dataset.value
        dispatch(selectDefautStatus(Number(value)))
    }, [])

    const SelectDefautRender = <Select
        data={statusList}
        value={defaultStatus}
        pointer
        noneBorder
        onChange={selectDefautStatusHandle}
    />

    const SelectStatusRender = (row, index) => {
        const status = row.visitStatus !== undefined && String(row.visitStatus)
        return <Select
            data={statusList}
            value={status || defaultStatus}
            onChange={selectStatusHandle(index)}
            pointer
            noneBorder
        />
    }

    const ActionsRender = (row, index) => <Actions
        isActive={row.isActive}
        handleEditClick={handleEditClick(row)}
        handleDeleteClick={handleDeleteClick(row)}
    />
    
    const columns = useCallback([
        {
            title: '№',
            render: (row, i) => i + 1,
            style: { textAlign: 'center' }
        },
        {
            title: 'ФИО',
            render: row => row.user && row.user.fullname,
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

                if (visited.length === row.count) return <Text color="error" colorBase="palette">{row.count - visited.length}</Text>
                if (visited.length > 0) return (row.count - visited.length)
                return row.count
            },
            style: { textAlign: 'center' }
        },
        {
            title: 'Дата покупки',
            render: row => moment(row.purchaseTime).format('DD-MM-YYYY'),
            style: { textAlign: 'center' }
        },
        {
            title: SelectDefautRender,
            render: SelectStatusRender,
            style: { width: '122px', textAlign: 'center' }
        },
        {
            title: '',
            render: ActionsRender,
        }
    ], [data])

    return (
        <>
            <Table
                data={data}
                columns={columns}
                loading={loading}
            />

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
        </>
    )
}

export default ClientCardTable