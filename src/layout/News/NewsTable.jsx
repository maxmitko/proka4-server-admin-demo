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
import { actionCreator } from 'store/reducers/news'
import styled from 'styled-components'

import Assignment from '@material-ui/icons/Assignment'

import Actions from '../GridView/Actions'
import Table from '../GridView/Table'
import { ButtonNew, ButtonsWrapper, Label, TableWrapper } from '../GridView/Table.styled'
import EditForm from './EditForm'

const NewsTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.news }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options )), []);
    const createItem = useCallback(data => dispatch(actionCreator.create(data)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);

    const { data, totalCount, loading, options } = useMappedState(mapState);
    const { skip, take } = options

    const [modal, setModal] = useState()
    const [message, setMessage] = useState(null)
    const [formState, setFormState] = useState({})
    const [initialData, setFormData] = useState({})
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
            header: locales.newsCreate,
            saveButton: locales.newsCreate
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

    const columns = useCallback([
        {
            title: '№',
            render: (row, i) => skip
                ? i + 1 + skip
                : i + 1,
        },
        {
            title: 'Название',
            render: row => row.title,
        },
        {
            title: 'Топик',
            render: row => row.topic,
        },
        {
            title: 'Начало',
            render: row => moment(row.startDate).format('DD-MM-YYYY'),

        },
        {
            title: 'Окончание',
            render: row => moment(row.endDate).format('DD-MM-YYYY'),
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
            <Label><Text variant="h6">Новости</Text></Label>

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
                    <Button onClick={handleCreateClick}>{locales.newsCreate}</Button>
                </ButtonNew>
            </ButtonsWrapper>

            <FormModal isOpen={modal} onClose={handleCloseModal} overlay>
                <EditForm
                    initialData={initialData}
                    formState={formState}
                />
            </FormModal>

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

export default NewsTable

const FormModal = styled(Modal)`
    max-height: calc(100vh - 70px);
`