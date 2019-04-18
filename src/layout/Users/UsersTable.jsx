import HeaderBadge from 'components/Badge/Header'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Paginator from 'components/Paginator'
import Paper from 'components/Paper'
import Text from 'components/Text'
import { LocalesContext } from 'LocalesProvider'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/users'
import Modal from 'components/Modal'
import Actions from '../GridView/Actions'
import Toggle from '../GridView/Toggle'
import Assignment from '@material-ui/icons/Assignment'

import Table from '../GridView/Table'
import { ButtonNew, ButtonsWrapper, Content, Label, TableWrapper } from '../GridView/Table.styled'
import EditForm from './EditForm'

const UsersTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.users }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);
    const createItem = useCallback(data => dispatch(actionCreator.create(data)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);
    const toggleItem = useCallback(data => dispatch(actionCreator.update(data)), []);

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
        fetchList({ take, skip })
    }

    const handleCreateClick = e => {
        e.preventDefault()

        setModal(true)
        setFormState({
            submitForm: createItem,
            header: locales.clientsCreate,
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
        setMessage(`Вы уверены что желаете удалить ${row.username}?`)
    }

    const handleDeleteConfirm = e => {
        e.preventDefault()

        setMessage(false)
        removeItem(removeId);
    }

    const usersColumns = useCallback([
        {
            title: '№',
            render: (row, i) => skip ? i + 1 + skip : i + 1,
            style: { textAlign: "center" }
        },
        {
            title: '',
            render: row => <Actions
                handleEditClick={handleEditClick(row)}
                handleDeleteClick={handleDeleteClick(row)}
                isActive={row.isActive}
            />,
            style: { width: '40px', textAlign: "center" }
        },
        {
            title: 'ФИО',
            render: row => row.fullname,
        },
        {
            title: 'Логин',
            render: row => row.username,
        },
        {
            title: 'Почта',
            render: row => row.email,
        },
        {
            title: 'Телефон',
            render: row => row.phone,
        },
        {
            title: 'Кошелек (руб)',
            render: row => row.money,
        },
        {
            title: 'Активен',
            render: row => <Toggle
                isActive={row.isActive}
                toggleActiveHandler={() => toggleItem({
                    id: row.id,
                    isActive: !row.isActive,
                })}
            />,
        },
    ], [data])

    return (
        <Paper>
            <HeaderBadge float="left"><Assignment /></HeaderBadge>
            <Label><Text variant="h6">Клиенты</Text></Label>

            <Content>
                <TableWrapper>
                    <Table
                        data={data}
                        columns={usersColumns}
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
                        <Button onClick={handleCreateClick}>{locales.clientsCreate}</Button>
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
            </Content>
        </Paper>
    )
}

export default UsersTable