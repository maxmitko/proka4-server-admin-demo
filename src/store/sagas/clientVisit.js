import { call, put, takeLatest, select } from 'redux-saga/effects'

import Api from '../api'
import { constants, actionCreator } from '../reducers/clientVisit'
import {
    CLIENT_REGISTRATION_SELECT_SERVICE,
    CLIENT_REGISTRATION_SELECT_DATE,
    CLIENT_REGISTRATION_SELECT_TIME,
    CLIENT_REGISTRATION_REGISTRATE,
} from '../reducers/clientRegistration'
import { pushMessage } from '../reducers/message'
import { withMessage, errorHandler } from '../utils/errorHandler'
import moment from 'moment'

// Sagas
export default function* watchFetch() {
    yield takeLatest([
        constants.fetchList,
        constants.createSuccess,
        constants.updateSuccess,
        constants.removeSuccess,
        CLIENT_REGISTRATION_SELECT_SERVICE,
        CLIENT_REGISTRATION_SELECT_TIME,
        CLIENT_REGISTRATION_SELECT_DATE,
    ], fetchListAsync);
    yield takeLatest([constants.create], createItemAsync);
    yield takeLatest([constants.read], readItemAsync);
    yield takeLatest([constants.update], updateItemAsync);
    yield takeLatest([constants.remove], removeItemAsync);
    yield takeLatest(CLIENT_REGISTRATION_REGISTRATE, registrateClientVisit);
}

const PATH = 'client-visit'
const STATE_PLACE = 'clientVisit'

// Worker Saga
function* fetchListAsync() {
    try {
        yield put(actionCreator.fetchListRequest())

        const state = yield select();
        const { timeFilter, dateFilter, serviceFilter } = state.clientRegistration
        let time = state.scheduleWeekTime.data.filter(item => item.id === Number(timeFilter))
        time = time.length ? time[0].title : undefined
        
        const options = {
            ...state[STATE_PLACE].options,
            date: dateFilter,
            service: serviceFilter,
            time,
        }

        const res = yield call(Api.findCustom, PATH, options);

        if (res.status >= 400) throw yield res.json()

        const list = yield res.json()

        yield put(actionCreator.fetchListSuccess(list));

    } catch (error) {
        yield put(actionCreator.fetchListError())
        yield put(pushMessage(errorHandler(error)))
    }
}

function* registrateClientVisit() {
    try {
        const state = yield select();
        const { timeFilter, dateFilter } = state.clientRegistration

        const currentRegTime = state.scheduleWeekTime.data.filter(item => item.id === Number(timeFilter))
        const registratedUsers = state.clientVisit.data.map(item => item.clientCard.user.id)

        const records = state.clientCard.data
            .filter(item => !registratedUsers.includes(item.user.id))
            .map(item => {
                const visitStatus = item.visitStatus !== undefined ? item.visitStatus : state.clientCard.defaultStatus

                return {
                    clientCard: item.id,
                    visitStatus,
                    regDate: moment(dateFilter).format('YYYY-MM-DD'),
                    regTime: currentRegTime.length && currentRegTime[0].title
                }
            })
        
        if (records.length === 0) {
            yield put(pushMessage({ type: 'warning', text: 'Записи уже существуют' }))
        } else {
            const response = yield call(Api.create, PATH, records);

            if (response.status === 200) yield put(actionCreator.updateSuccess());
        }

    } catch (error) {
        yield put(actionCreator.updateError())
        yield put(pushMessage(errorHandler(error)))
    }
}

function* createItemAsync() {
    try {

        yield put(actionCreator.createRequest())

        const state = yield select();
        const res = yield call(Api.create, PATH, state[STATE_PLACE].crud.data);

        if (res.status >= 400) throw yield res.json()

        yield put(actionCreator.createSuccess())

    } catch (error) {
        yield put(actionCreator.createError())
        yield put(pushMessage(errorHandler(error)))
    }
}

function* readItemAsync() {
    try {
        yield put(actionCreator.readRequest())

        const state = yield select();
        const res = yield call(Api.findOne, PATH, state[STATE_PLACE].crud.requestedId);

        if (res.status >= 400) throw yield res.json()

        const data = yield res.json()
        yield put(actionCreator.readSuccess(data))

    } catch (error) {
        yield put(actionCreator.readError())
        yield put(pushMessage(errorHandler(error)))
    }
}

function* updateItemAsync() {
    try {
        yield put(actionCreator.updateRequest())

        const state = yield select();
        const res = yield call(Api.create, PATH, state[STATE_PLACE].crud.data);

        if (res.status >= 400) throw yield res.json()

        yield put(actionCreator.updateSuccess())
        const message = withMessage.updateSuccess()
        yield put(pushMessage(message))

    } catch (error) {
        yield put(actionCreator.updateError())
        yield put(pushMessage(errorHandler(error)))
    }
}

function* removeItemAsync() {
    try {
        yield put(actionCreator.removeRequest())

        const state = yield select();
        const res = yield call(Api.remove, PATH, state[STATE_PLACE].crud.requestedId);

        if (res.status >= 400) throw yield res.json()

        yield put(actionCreator.removeSuccess())

    } catch (error) {
        yield put(actionCreator.removeError())
        yield put(pushMessage(errorHandler(error)))
    }
}