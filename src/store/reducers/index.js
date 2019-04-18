import {combineReducers} from 'redux'

import scheduleWeekTime from "./scheduleWeekTime";
import clientCard from "./clientCard";
import clientVisit from "./clientVisit";
import message from "./message";
import dialog from "./dialog";
import users from "./users";
import userCard from "./userCard";
import news from "./news";
import service from "./service";
import ticket from "./ticket";
import scheduleList from "./scheduleList";
import scheduleType from "./scheduleType";
import scheduleWeek from "./scheduleWeek";
import clientRegistration from "./clientRegistration";
import appointment from "./appointment";
import orders from "./orders";
import ordersBook from "./ordersBook";
import product from "./product";
import productPropsEdit from "./productPropsEdit";
import productProperty from "./productProperty";
import productPropertyType from "./productPropertyType";
import productCategory from "./productCategory";
import productProducer from "./productProducer";
import ownerPanel from "./ownerPanel";
import widgetUsers from "./widgetUsers";
import widgetAppointment from "./widgetAppointment";
import widgetClientVisit from "./widgetClientVisit";
import widgetOrders from "./widgetOrders";


const reducers = combineReducers({
    clientCard,
    clientVisit,
    users,
    userCard,
    message,
    dialog,
    news,
    service,
    ticket,
    scheduleList,
    scheduleType,
    scheduleWeek,
    scheduleWeekTime,
    clientRegistration,
    appointment,
    orders,
    ordersBook,
    product,
    productPropsEdit,
    productProperty,
    productPropertyType,
    productCategory,
    productProducer,
    ownerPanel,
    widgetUsers,
    widgetAppointment,
    widgetClientVisit,
    widgetOrders,
});

export default reducers;
