import HeaderBadge from 'components/Badge/Header'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Modal from 'components/Modal'
import Paginator from 'components/Paginator'
import Text from 'components/Text'
import { LocalesContext } from 'LocalesProvider'
import moment from 'moment'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/scheduleList'
import { actionCreator as weekActions } from 'store/reducers/scheduleWeek'

import Assignment from '@material-ui/icons/Assignment'

import Actions from 'components/GridView/Actions'
import Table from 'components/GridView/Table'
import { ButtonNew, ButtonsWrapper, Label, TableWrapper } from 'components/GridView/Table.styled'
import Toggle from 'components/GridView/Toggle'
import ColorBox from './ColorBox'
import EditForm from './EditForm'

const ScheduleTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.scheduleList }), [])

    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options )), []);
    const createItem = useCallback(data => dispatch(actionCreator.create(data)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);
    const fetchScheduleWeek = useCallback(props => dispatch(weekActions.fetchList(props)), []);

    const { data, totalCount, loading, options } = useMappedState(mapState);
    const { skip, take } = options

    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState(null)
    const [formState, setFormState] = useState({})
    const [initialData, setFormData] = useState()
    const [removeId, setDeleteId] = useState(null)
    const [selectedRow, setSelectedRow] = useState(0)
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
            header: locales.scheduleCreate,
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
        updateItem({
            id: row.id,
            isActive: !row.isActive
        })
    }

    const rowClickHandle = (row, i) => {
        setSelectedRow(i)
        fetchScheduleWeek({ scheduleList: row.id })
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
            title: 'Цвет',
            render: row => <ColorBox color={row.color} />,
            style: { textAlign: "center" },
        },
        {
            title: 'Группа',
            render: row => row.scheduleType && row.scheduleType.title,
        },
        {
            title: 'Начало',
            render: row => row.startDate && moment(row.startDate).format('DD.MM.YYYY'),
        },
        {
            title: 'Конец',
            render: row => row.endDate && moment(row.endDate).format('DD.MM.YYYY'),
        },
        {
            title: 'Активен',
            render: row => <Toggle
                isActive={row.isActive}
                toggleActiveHandler={toggleActiveHandler(row)}
            />,
        },
        {
            title: 'Действия',
            render: row => <Actions
                handleEditClick={handleEditClick(row)}
                handleDeleteClick={handleDeleteClick(row)}
            />,
        }
    ], [data])

    return (
        <>
            <HeaderBadge float="left"><Assignment /></HeaderBadge>
            <Label><Text variant="h6">{locales.scheduleList}</Text></Label>

            <TableWrapper>
                <Table
                    data={data}
                    columns={columns}
                    loading={loading}
                    onRowClick={rowClickHandle}
                    defaultRow={selectedRow}
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
                    <Button onClick={handleCreateClick}>{locales.scheduleCreate}</Button>
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
        </>
    )
}

export default ScheduleTable