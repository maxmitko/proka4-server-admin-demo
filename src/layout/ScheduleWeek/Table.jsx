import Button from 'components/Button'
import Text from 'components/Text'
import { LocalesContext } from 'LocalesProvider'
import React, { useCallback, useContext, useEffect } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/scheduleWeek'
import styled from 'styled-components';

import Add from '@material-ui/icons/Add'

import Table from 'components/GridView/Table';
import { Label } from 'components/GridView/Table.styled'
import rawColumns from './Table.columns'

const WeekTable = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(({ scheduleWeek, scheduleWeekTime, scheduleList }) => ({
        ...scheduleWeek,
        scheduleWeekTime,
        initialId: !!scheduleList.data.length && scheduleList.data[0].id
    }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options )), []);
    const createItem = useCallback(data => dispatch(actionCreator.create(data)), []);
    const updateItem = useCallback(data => dispatch(actionCreator.update(data)), []);
    const removeItem = useCallback(id => dispatch(actionCreator.remove(id)), []);

    const { data, options, loading, initialId, scheduleWeekTime } = useMappedState(mapState);
    const locales = useContext(LocalesContext)

    useEffect(() => {
        if (initialId) {
            fetchList({ scheduleList: initialId })
        }
    }, [initialId])

    const onChangeTime = row => e => {
        updateItem({
            id: row.id,
            timeList: e.target.dataset.value
        })
    };

    const createItemHandle = e => {
        createItem({
            scheduleList: options.scheduleList,
            weekDays: Array.from({ length: 7 }, () => null)
        })
    };

    const cellClickHandle = (row, day) => e => {

        const arr = row.weekDays

        const result = arr[day]
            ? arr.map((item, i) => i === day ? null : item)
            : arr.map((item, i) => i === day ? row.scheduleList.id : item)

        updateItem({ id: row.id, weekDays: result })
    };

    const handleDeleteClick = row => e => {
        removeItem(row.id)
    };

    const columns = rawColumns({ scheduleWeekTime, onChangeTime, handleDeleteClick, cellClickHandle })
    const scheduleTitle = data[0] ? data[0].scheduleList.title : ''

    return (
        <>
            <Label><Text variant="h6">{locales.scheduleWeek + ' ' + scheduleTitle}</Text></Label>
            <TableWrapper>
                <Table
                    data={data}
                    columns={useCallback(columns, [data])}
                    loading={loading}
                />
            </TableWrapper>
            <ButtonNew>
                <Button round onClick={createItemHandle}><Add /></Button>
            </ButtonNew>
        </>
    )
}

export default WeekTable

const TableWrapper = styled.div`
    padding: 20px 10px;
    min-height: 400px;
    
    td:first-child {
        width: 87px;
        min-width: 87px;

        input {
            text-align: inherit;
        }
    }

    td {
        position: relative;
        text-align: center;
    }

    td:nth-child(even) {
        background-color: #fcf8e3;
    }
`

const ButtonNew = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 10px;
`