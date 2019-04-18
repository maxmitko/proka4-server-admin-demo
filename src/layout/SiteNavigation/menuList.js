import React from 'react'
import Group from '@material-ui/icons/Group';
import ViewQuilt from '@material-ui/icons/ViewQuilt';
// import InsertChart from '@material-ui/icons/InsertChart';
// import DateRange from '@material-ui/icons/DateRange';

export default [
    {
        title: 'Групповые занятия',
        path: '',
        icon: <Group />,
        multilevel: [
            {
                title: 'Учет посещений',
                path: '/registration',
                icon: ''
            },
            {
                title: 'Клиенты',
                path: '/users',
                icon: ''
            },
            {
                title: 'Aбонименты',
                path: '/ticket',
                icon: ''
            }, 
            {
                title: 'Услуги',
                path: '/service',
                icon: ''
            },
            {
                title: 'Заявки',
                path: '/bids',
                icon: ''
            },
        ]
    },
    {
        title: 'Контент сайта',
        path: '',
        icon: <ViewQuilt />,
        multilevel: [
            {
                title: 'Новости',
                path: '/news',
                icon: ''
            },
            {
                title: 'Расписание',
                path: '/schedule-list',
            },
            {
                title: 'Магазин',
                path: '/shop-list',
            },
        ]
    },
];