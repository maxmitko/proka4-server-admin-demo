import React, { useEffect, useState, useCallback } from 'react'

import Table from 'components/GridView/Table'
import Select from 'components/Select'
import statusList from '../ClientRegistration/statusList'
import Actions from 'components/GridView/Actions'
import Dialog from 'components/Dialog'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/clientVisit'

const ClientVisitTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.clientVisit }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);
    const selectStatus = useCallback(data => dispatch(actionCreator.update(data)), []);

    const { data, options, loading } = useMappedState(mapState);
    const { skip, take } = options

    const [message, setMessage] = useState(null)
    const [removeId, setDeleteId] = useState(null)

    useEffect(() => {
        if (!data.length) fetchList({ skip, take })
    }, []);

    const handleDeleteClick = row => e => {
        e.preventDefault()

        setDeleteId(row.id)
        setMessage(`Вы уверены что желаете удалить ${row.clientCard.user.fullname} ${row.clientCard.service.title}?`)
    }

    const handleDeleteConfirm = e => {
        e.preventDefault()

        setMessage(false)
        removeItem(removeId);
    }

    const SelectStatusRender = (row, index) => {
        const status = row.visitStatus !== undefined && String(row.visitStatus)
        return <Select
            data={statusList}
            value={status}
            onChange={e => selectStatus({
                id: row.id,
                visitStatus: e.target.dataset.value,
            })}
            pointer
            noneBorder
        />
    }

    const ActionsRender = (row, index) => <Actions
        isActive={row.isActive}
        handleDeleteClick={handleDeleteClick(row)}
    />

    const columns = useCallback([
        {
            title: '№',
            render: (row, i) => skip
                ? i + 1 + skip
                : i + 1
        },
        {
            title: 'ФИО',
            render: row => row.clientCard.user.fullname,
        },
        {
            title: 'Курс',
            render: row => row.clientCard.service.title,
        },
        {
            title: 'Время',
            render: row => row.regTime.slice(0, -3),
            style: { textAlign: 'center' }
        },
        {
            title: 'Статус',
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

export default ClientVisitTable