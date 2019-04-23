import React from 'react'
import Actions from 'components/GridView/Actions'

const сolumns = props => {

    const { skip, handleEditClick, handleDeleteClick } = props

    return [
        {
            title: '№',
            render: (row, i) => skip ? i + 1 + skip : i + 1,
        },
        {
            title: 'Название',
            render: row => row.title,
            
        },
        {
            title: 'Услуга',
            render: row => row.service.title,
        },
        {
            title: 'Количество',
            render: row => row.count,
        },
        {
            title: 'Стоимость',
            render: row => row.price,
        },
        {
            title: '',
            render: row => <Actions
                handleEditClick={handleEditClick(row)}
                handleDeleteClick={handleDeleteClick(row)}
            />,
        }
    ]

}

export default сolumns