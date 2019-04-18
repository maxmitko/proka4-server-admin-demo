import { all } from 'redux-saga/effects'

import watchFetchClientCard from './clientCard'
import watchFetchClientVisit from './clientVisit'
import watchFetchTimeList from './scheduleWeekTime'
import watchFetchUsers from './users'
import watchFetchUserCard from './userCard'
import watchFetchNews from './news'
import watchFetchService from './service'
import watchFetchTicket from './ticket'
import watchFetchScheduleList from './scheduleList'
import watchFetchScheduleType from './scheduleType'
import watchFetchScheduleWeek from './scheduleWeek';
import watchFetchAppointment from './appointment';
import watchFetchOrders from './orders';
import watchFetchOrdersBook from './ordersBook';
import watchFetchProduct from './product';
import watchFetchProductPropsEdit from './productPropsEdit';
import watchFetchProductCategory from './productCategory';
import watchFetchProductProducer from './productProducer';
import watchFetchProductProperty from './productProperty';
import watchFetchProductPropertyType from './productPropertyType';
import watchFetchOwnerPanel from './ownerPanel';
import watchFetchWidgetUsers from './widgetUsers';
import watchFetchWidgetClienVisits from './widgetClienVisits';
import watchFetchWidgetOrders from './widgetOrders';
import watchFetchWidgetAppointment from './widgetAppointment';

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        watchFetchTimeList(),
        watchFetchClientCard(),
        watchFetchClientVisit(),
        watchFetchUsers(),
        watchFetchUserCard(),
        watchFetchNews(),
        watchFetchService(),
        watchFetchTicket(),
        watchFetchScheduleList(),
        watchFetchScheduleType(),
        watchFetchScheduleWeek(),
        watchFetchAppointment(),
        watchFetchOrders(),
        watchFetchOrdersBook(),
        watchFetchProduct(),
        watchFetchProductPropsEdit(),
        watchFetchProductCategory(),
        watchFetchProductProducer(),
        watchFetchProductProperty(),
        watchFetchProductPropertyType(),
        watchFetchOwnerPanel(),
        watchFetchWidgetUsers(),
        watchFetchWidgetClienVisits(),
        watchFetchWidgetOrders(),
        watchFetchWidgetAppointment(),
    ])
}
