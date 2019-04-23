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
import { actionCreator, toggleActive } from 'store/reducers/service'

import Assignment from '@material-ui/icons/Assignment'

import Actions from 'components/GridView/Actions'
import Table from 'components/GridView/Table'
import { ButtonNew, ButtonsWrapper, Label, TableWrapper } from 'components/GridView/Table.styled'
import Toggle from 'components/GridView/Toggle'
import EditForm from './ServiceEditForm'

const ServiceTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.service }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);
    const toggleItem = useCallback(data => dispatch(toggleActive(data)), []);
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
            header: locales.serviceCreate,
            saveButton: locales.serviceCreate
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
            saveButton: locales.save
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

    const toggleActiveHandler = row => e => {
        toggleItem({ id: row.id, isActive: !row.isActive })
    }

    const serviceColumns = useCallback([
        {
            title: '№',
            render: (row, i) => skip ? i + 1 + skip : i + 1,
        },
        {
            title: 'Название',
            render: row => row.title,
        },
        {
            title: 'Порядковый номер',
            render: row => row.myOrder,
            style: { textAlign: 'center' }
        },
        {
            title: 'Картинка',
            render: row => <img src={`${process.env.REACT_APP_SERVER_URL}/images/service/410x240/${row.image}`} height="50px" alt={row.image} />,
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
            <HeaderBadge float="left"><Assignment /></HeaderBadge>
            <Label><Text variant="h6">{locales.service}</Text></Label>

            <TableWrapper>
                <Table
                    data={data}
                    columns={serviceColumns}
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
                    <Button onClick={handleCreateClick}>{locales.serviceCreate}</Button>
                </ButtonNew>
            </ButtonsWrapper>

            <Modal isOpen={modal} onClose={handleCloseModal} overlay>
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

export default ServiceTable