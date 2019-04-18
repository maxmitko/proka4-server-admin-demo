import ColorBox from './ColorBox'
import React from 'react'
import Select from 'components/Select'
import Actions from '../GridView/Actions'

const сolumns = props => {

    const { scheduleWeekTime, onChangeTime, handleDeleteClick, cellClickHandle } = props

    const timeSelect = scheduleWeekTime.data.map(item => ({ label: item.title.slice(0, -3), value: item.id }))

    return [
        {
            title: 'Время',
            render: row =>
                <Select
                    value={row.timeList && row.timeList.id}
                    data={timeSelect}
                    variant="outlined"
                    noneBorder
                    onChange={onChangeTime(row)}
                />
        },
        {
            title: 'ПН',
            field: 'mon',
            render: row =>
                <ColorBox
                    color={row.weekDays[0] ? row.scheduleList.color : ''}
                    onClick={cellClickHandle(row, 0)}
                />,
        },
        {
            title: 'ВТ',
            field: 'tue',
            render: row =>
                <ColorBox
                    color={row.weekDays[1] ? row.scheduleList.color : ''}
                    onClick={cellClickHandle(row, 1)}
                />,
        },
        {
            title: 'СР',
            field: 'wed',
            render: row =>
                <ColorBox
                    color={row.weekDays[2] ?  row.scheduleList.color : ''}
                    onClick={cellClickHandle(row, 2)}
                />,
        },
        {
            title: 'ЧТ',
            field: 'thu',
            render: row =>
                <ColorBox
                    color={row.weekDays[3] ? row.scheduleList.color : ''}
                    onClick={cellClickHandle(row, 3)}
                />,
        },
        {
            title: 'ПТ',
            field: 'fri',
            render: row =>
                <ColorBox
                    color={row.weekDays[4] ? row.scheduleList.color : ''}
                    onClick={cellClickHandle(row, 4)}
                />,
        },
        {
            title: 'СБ',
            field: 'sut',
            render: row =>
                <ColorBox
                    color={row.weekDays[5] ? row.scheduleList.color : ''}
                    onClick={cellClickHandle(row, 5)}
                />,
        },
        {
            title: 'ВС',
            field: 'sun',
            render: row =>
                <ColorBox
                    color={row.weekDays[6] ? row.scheduleList.color : ''}
                    onClick={cellClickHandle(row, 6)}
                />,
        },
        {
            title: '',
            render: row => <Actions handleDeleteClick={handleDeleteClick(row)} />,
        }
    ]

}

export default сolumns